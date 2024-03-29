"use server"

import { requestConfig } from "@/config/request"
import prisma from "@/lib/prisma"
import { action } from "@/lib/safe-action"
import { getArticle, getArticleInteractions, getArticles, getArticlesPages, getFilteredArticles, getUserAndCreateIfHeNotExist } from "@/lib/utilsServer"
import { articleBodyUpdateSchema, articleGenerateContentSchema, articleImageUpdateSchema, articlePostCommentSchema, articlePostLikeSchema, articleTitleUpdateSchema, emailPostSchema } from "@/lib/validation"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { format } from "date-fns"
import OpenAI from 'openai'
import { env } from "@/env"
import { CourierClient } from "@trycourier/courier";

const courier = new CourierClient({ authorizationToken: env.COURIER_API_KEY });

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY
})

export async function getPaginatedArticles(currentPage: number) {
    const allArticles = await getArticles()
    const totalPages = await getArticlesPages("")
    const startIndex = (currentPage - 1) * requestConfig.pageSize
    const endIndex = startIndex + requestConfig.pageSize

    const data =  allArticles.slice(startIndex, endIndex)
    if(currentPage === totalPages) return {
        data
    }

    return {
        data,
        nextCursor: currentPage + 1
    }
} 

export async function getArticleLikes(articleId: string) {
    const interactions =  await getArticleInteractions(articleId)
    return interactions.likes
} 

export async function getArticleComments(articleId: string) {
    const interactions =  await getArticleInteractions(articleId)
    return interactions.comments
} 

export async function getSearchedArticles(query: string) {
    const results = await getFilteredArticles(query, 1)
    if(results.length > 4) return results.slice(undefined, 3)
    return results
}

export const subscribe = action(emailPostSchema, async ({ email }) => {
    try {
        await prisma.subscription.create({
            data: {
                email
            }
        })

        const { requestId } = await courier.send({
            message: {
              to: {
                email: email,
              },
              template: "M3G3EH9N7M47CFJSX8DC1N1GYYAW",
            },
        });

        revalidatePath('/dashboard/newsletter')

        return {
            success: true
        }
    } catch {
        return {
            error: true
        }
    }
})

export const createArticle = action(z.object({}), async () => {
    const defaultData =  {
        "time":1708430429202,
        "blocks":[{
            "id":"9H3PxLZJNY",
            "type":"paragraph",
            "data":{ "text": "" }
        }],
        "version":"2.29.0"
    }

    const user = await getUserAndCreateIfHeNotExist()
    if(user) {
        const article = await prisma.article.create({
            data: {
               title: `Draft ${format(new Date(), "yyyy-mm-dd hh:mm:ss")}`,
               description: "A simple description",
               body: JSON.stringify(defaultData),
               category: "category",
               authors: {
                connect: [{ id: user.id}]
               }
            }
        })
        revalidatePath('/articles')
        revalidatePath('/dashboard')
        revalidatePath('/dashboard/articles')
        return {
            articleId: article.id,
            success: true
        }       
    }
    return {
        error: true
    }
})

export const updateArticleBody = action(articleBodyUpdateSchema, async ({ articleId, body }) => {
    try {
        await prisma.article.update({
            where: {
                id: articleId
            },
            data: {
                body: JSON.stringify(body)
            }
        })
        revalidatePath('/articles')
        revalidatePath(`/articles/${articleId}`)
        revalidatePath('/dashboard/articles')
        revalidatePath(`/editor/${articleId}`)
        return {
            success: true
        }
    } catch {
        return {
            error: true
        }
    }
})

export const generateArticleBody = action(articleGenerateContentSchema, async ({ articleId }) => {
    const article = await getArticle(articleId)

    if(!article) return {
        error: true
    }

    const context =  `
        title: ${article.title}, 
    `
    const prompt: any = [
        {
            role: 'system',
            content: `AI assistant that generates article body from its title
                START CONTEXT BLOCK
                ${context}
                END OF CONTEXT BLOCK
            `,
        },
        {
            role: 'user',
            content: 'Generate',
        }
    ]


    const res = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [...prompt,        ],
        temperature: 0.7,
    })

    const messages = res.choices.map(choice => choice.message).map(message => message.content)
    const generatedContent = messages.join("")

    try {
        await prisma.article.update({
            where: {
                id: articleId
            },
            data: {
                body: JSON.stringify({
                    "time":1708430429202,
                    "blocks":[{
                        "id":"9H3PxLZJNY",
                        "type":"paragraph",
                        "data":{ "text": generatedContent }
                    }],
                    "version":"2.29.0"
                })
            }
        })
        revalidatePath('/articles')
        revalidatePath(`/articles/${articleId}`)
        revalidatePath('/dashboard/articles')
        revalidatePath(`/editor/${articleId}`)
        return {
            success: true
        }
    } catch {
        return {
            error: true
        }
    }
})

export const updateArticleImage = action(articleImageUpdateSchema, async ({ articleId, imageUrl }) => {
    try {
        await prisma.article.update({
            where: {
                id: articleId
            },
            data: {
                image: imageUrl
            }
        })
        revalidatePath('/articles')
        revalidatePath(`/articles/${articleId}`)
        revalidatePath('/dashboard/articles')
        revalidatePath(`/editor/${articleId}`)
        return {
            success: true
        }
    } catch {
        return {
            error: true
        }
    }
})

export const updateArticleTitle = action(articleTitleUpdateSchema, async ({ articleId, title }) => {
    try {
        await prisma.article.update({
            where: {
                id: articleId
            },
            data: {
                title: title
            }
        })
        revalidatePath('/articles')
        revalidatePath(`/articles/${articleId}`)
        revalidatePath('/dashboard/articles')
        revalidatePath(`/editor/${articleId}`)
        return {
            success: true
        }
    } catch {
        return {
            error: true
        }
    }
})

export const postComment = action(articlePostCommentSchema, async ({ articleId, body }) => {
    const user = await getUserAndCreateIfHeNotExist()
    if(user) {
        await prisma.comment.create({
            data: {
                body: body,
                articleId: articleId,
                userId: user.id
            }
        })
        revalidatePath(`/articles/${articleId}`)
        return {
            comments: await getArticleComments(articleId)
        }
    } else {
        return {
            error: true
        }
    }
})

export const toggleLike = action(articlePostLikeSchema, async ({ articleId }) => {
    const user = await getUserAndCreateIfHeNotExist()
    if(user) {
        revalidatePath(`/articles/${articleId}`)

        const like = await prisma.like.findFirst({
            where: {
                articleId: articleId,
                userId: user.id
            }
        })

        if(like) {
            await prisma.like.delete({
                where: {
                    id: like.id
                }
            })
            return {
                success: true,
                message: "Disliked"
            }
        } else {
            await prisma.like.create({
                data: {
                    articleId: articleId,
                    userId: user.id
                }
            })
            return {
                success: true,
                message: "liked"
            }
        }

    } else {
        return {
            error: true
        }
    }
})