import { requestConfig } from "@/config/request";
import { Article, Comment, Like } from "@/lib/validation";
import prisma from "./prisma";
import { currentUser } from "@clerk/nextjs";

export async function getAuthors() {
    return await prisma.user.findMany({
        where: {
           author: true 
        }
    })
}

export async function getArticles() {
    const articles:  Article[] = await prisma.article.findMany({
        include: {
            authors: true
        }
    })
  
    return articles
}

export async function getFeaturedArticles() {
    const count = await prisma.article.count({
        where: {
            NOT: {
                image: null
            }
        }
    })
    if(count < 6) return []
    const featured = await prisma.article.findMany({
        where: {
            NOT: {
                image: null
            }
        },
        take: 5,
        include: {
            authors: true
        }
    })
    return featured
}

export async function getRelatedArticles(articleId: string) {
    const user = await prisma.article.findFirst({
        where: {
            id: articleId
        },
        include: {
            authors: {
                include: {
                    articles: {
                        include: {
                            authors: true
                        }
                    }
                }
            }
        }
    })

    if(user) {
        const author = user.authors[0]
        if(author.articles.length > 3) return author.articles.filter(article => article.id !== articleId).slice(undefined, 3)
        return author.articles.filter(article => article.id !== articleId)
    }
    
    return await prisma.article.findMany({
        take: 3,
        include: {
            authors: true
        }
    })
}

export async function getArticle(id: string) {
    const article:  Article | null = await prisma.article.findFirst({
        where: {
            id: id
        },
        include: {
            authors: true
        }
    })
  
    return article
}

export async function getArticleInteractions(articleId: string) {
    const commentsRaw = await prisma.comment.findMany({
        where: {
            articleId: articleId
        },
        include: {
            author: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const likesRaw = await prisma.like.findMany({
        where: {
            articleId: articleId
        },
        include: {
            author: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    
    const comments: Comment[] = commentsRaw.map(comment => ({
        name: comment.author.name,
        image: comment.author.image,
        articleId: comment.articleId,
        body: comment.body,
        createdAt: comment.createdAt
    }))
    
    const likes: Like[] = likesRaw.map(like => ({
        name: like.author.name,
        image: like.author.image,
        articleId: like.articleId,
        createdAt: like.createdAt
    }))

    return {
        comments,
        likes
    }
}

// TO DO: Optimize query
export async function getArticlesPages(query: string) {
    const allArticles = await getArticles()
    const filteredArticles =  allArticles.filter(
        article => article.title.toLowerCase().includes(query.toLocaleLowerCase())
    )
    return Math.ceil(filteredArticles.length / requestConfig.pageSize)
}

// TO DO: Optimize query
export async function getFilteredArticles(query: string, currentPage: number) {
    const allArticles = await getArticles()
    const filteredArticles =  allArticles.filter(
        article => article.title.toLowerCase().includes(query.toLocaleLowerCase())
    )
    const startIndex = (currentPage - 1) * requestConfig.pageSize
    const endIndex = startIndex + requestConfig.pageSize
    return filteredArticles.slice(startIndex, endIndex)
}

export async function getMetrics() {
    return {
        articles: await prisma.article.count(),
        users: await  prisma.user.count(),
        authors: await  prisma.user.count({ where: { author: true }}),
        comments: await prisma.comment.count(),
        likes: await prisma.like.count()
    }
}

export async function getUserAndCreateIfHeNotExist() {
  const clerkUser = await currentUser();
 
  if (!clerkUser) return null

  const user = await prisma.user.findFirst({
    where: {
        id: clerkUser.id
    },
    include: {
        articles: true
    }
  })

  if(user) return user

  return await prisma.user.create({
    data: {
        id: clerkUser.id,
        name: `${clerkUser.firstName} ${clerkUser.lastName}`,
        image: clerkUser.imageUrl,
    },
    include: {
        articles: true
    }
  })
}
