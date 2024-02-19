import { Article } from "@/lib/validation"
import { HTMLAttributes } from "react"
import { FeaturedArticle } from "./featured-article"


interface FeaturedArticlesProps extends HTMLAttributes<HTMLElement> {
    articles: Article[]
}

export function FeaturedArticleList({ articles }: FeaturedArticlesProps) {
    return (
        <div className="flex flex-col min-h-[600px] gap-4 lg:grid lg:grid-cols-3 lg:grid-rows-5">
            <FeaturedArticle 
                article={articles[0]} 
                className="row-span-5" 
            />
            <FeaturedArticle 
                article={articles[1]} 
                className="row-span-3" 
            />
            <FeaturedArticle 
                article={articles[2]} 
                className="row-span-2" 
            />
            <FeaturedArticle 
                article={articles[3]} 
                className="row-span-3" 
            />
            <FeaturedArticle 
                article={articles[4]} 
                className="row-span-2" 
            />
        </div>
    )
}