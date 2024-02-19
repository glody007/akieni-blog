import { Article } from "./article"
import { getArticles, getFilteredArticles } from "@/lib/utilsServer"

export async function ArticleList({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const articles = await getFilteredArticles(query, currentPage)

    return (
        <div className="flex flex-col min-h-[600px] gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
                <Article key={index} article={article} />
            ))}
        </div>
    )
}