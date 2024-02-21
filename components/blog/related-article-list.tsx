import { Article } from "@/lib/validation"
import { HTMLAttributes } from "react"
import { RelatedArticle } from "./related-article"
import { getRelatedArticles } from "@/lib/utilsServer"


interface RelatedArticlesProps extends HTMLAttributes<HTMLElement> {
    article: Article
}

export async function RelatedArticleList({ article }: RelatedArticlesProps) {
    const articles = await getRelatedArticles(article.id)

    return (
        <div className="flex flex-col gap-4">
            {articles.map((article, index) => (
                <RelatedArticle key={index} article={article} />
            ))}
            {articles.length === 0 && (
                <p className="text-sm">No related articles</p>
            )}
        </div>
    )
}