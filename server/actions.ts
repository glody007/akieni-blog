"use server"

import { requestConfig } from "@/config/request"
import { getArticles, getArticlesPages } from "@/lib/utilsServer"

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