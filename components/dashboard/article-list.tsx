import { Article as ArticleType } from "@/lib/validation"
import { HTMLAttributes } from "react"
import { Article } from "./article"
import { getArticles } from "@/lib/utilsServer"


interface ArticlesProps extends HTMLAttributes<HTMLElement> {
    
}

export async function ArticleList({ }: ArticlesProps) {
    const articles = await getArticles()

    return (
        <div className="flex flex-col min-h-[600px] gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
                <Article key={index} article={article} />
            ))}
        </div>
    )
}