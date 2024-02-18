import { getArticles } from "@/lib/utilsServer"
import { Article } from "@/lib/validation";
import { notFound } from "next/navigation";

export const dynamicParams = true;

export async function generateStaticParams() {
    const allArticles = await getArticles()
    return allArticles.map(article => ({ id: article.id }))
}
   
async function getArticle(id: string): Promise<Article | undefined> {
    const allArticles = await getArticles()
    return allArticles[parseInt(id)]
}


interface Props {
    params: {
        id: string
    }
}

export default async function ArticlePage({ params }: Props) {
    const article = await getArticle(params.id)

    if(!article) return notFound()
    
    return (
        <div>
            
        </div>
    )
}