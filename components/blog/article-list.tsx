import { Article as ArticleType } from "@/lib/validation"
import { HTMLAttributes } from "react"
import { Article } from "./article"


interface ArticlesProps extends HTMLAttributes<HTMLElement> {
    articles: ArticleType[]
}

export function ArticleList({ articles }: ArticlesProps) {
    return (
        <div className="flex flex-col gap-8 lg:gap-20 lg:grid lg:grid-cols-2">
            {articles.map((article, index) => (
                <Article key={index} article={article} />
            ))}
        </div>
    )
}