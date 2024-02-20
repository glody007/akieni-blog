"use server"

import { requestConfig } from "@/config/request"
import { action } from "@/lib/safe-action"
import { getArticleInteractions, getArticles, getArticlesPages } from "@/lib/utilsServer"
import { articleBodyUpdateSchema, articlePostCommentSchema, articlePostLikeSchema, articleTitleUpdateSchema, emailPostSchema } from "@/lib/validation"
import { revalidatePath } from "next/cache"
import { z } from "zod"

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

export const subscribe = action(emailPostSchema, async ({ email }) => {
    revalidatePath('/dashboard/newsletter')
    return 'success'
})

export const createArticle = action(z.object({}), async () => {
    revalidatePath('/articles')
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/articles')
    return 'success'
})

export const updateArticleBody = action(articleBodyUpdateSchema, async ({ articleId, body }) => {
    revalidatePath('/articles')
    revalidatePath(`/articles/${articleId}`)
    revalidatePath('/dashboard/articles')
    return 'success'
})

export const updateArticleTitle = action(articleTitleUpdateSchema, async ({ articleId, title }) => {
    revalidatePath('/articles')
    revalidatePath(`/articles/${articleId}`)
    revalidatePath('/dashboard/articles')
    return 'success'
})

export const postComment = action(articlePostCommentSchema, async ({ articleId, body }) => {
    revalidatePath(`/articles/${articleId}`)
    return 'success'
})

export const like = action(articlePostLikeSchema, async ({ articleId }) => {
    revalidatePath(`/articles/${articleId}`)
    return 'success'
})