"use client"

import React, { HTMLAttributes } from "react"
import { Article } from "./article"
import { useGetArticles } from "@/data/get-articles"
import { Button } from "../ui/button"


interface ArticlesProps extends HTMLAttributes<HTMLElement> {

}

export function ArticleList({  }: ArticlesProps) {
    const { 
        data: response, 
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useGetArticles()

    if(isLoading) return <div>Loading...</div>

    if(!response)  return <div>Error</div>

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-8 lg:gap-20 lg:grid lg:grid-cols-2">
                {response.pages.map((group, i) => (
                    <React.Fragment key={i}>
                        {group.data.map((article) => (
                            <Article key={article.id} article={article} />
                        ))}
                    </React.Fragment>
                ))}
            </div>
            <div className="flex justify-center">
                <Button
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                    variant="secondary"
                >
                    {isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage
                        ? 'Load More'
                        : 'Nothing more to load'}
                </Button>
            </div>
        </div>
    )
}