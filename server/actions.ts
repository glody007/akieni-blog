"use server"

import { requestConfig } from "@/config/request"
import { getArticleInteractions, getArticles, getArticlesPages } from "@/lib/utilsServer"

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