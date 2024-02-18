import { Icons } from "@/components/icons";
import { getArticle, getArticles } from "@/lib/utilsServer"
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = true;

export async function generateStaticParams() {
    const allArticles = await getArticles()
    return allArticles.map(article => ({ id: article.id }))
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
        <div className="min-h-screen flex flex-col items-center p-4">
            <div className="w-full flex flex-col gap-10 lg:gap-16 max-w-6xl">
                <Link href="/" className="flex items-center cursor-pointer text-sm text-muted-foreground font-light hover:text-foreground">
                    <Icons.arrowLeft className="w-4 h-4 mr-2" />
                    Back to blog
                </Link>
                <div className="flex flex-col gap-4 lg:gap-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-light">
                        <div className="bg-muted text-foreground rounded-2xl px-3 py-2">
                            {article.category}
                        </div>
                        <div>
                            {format(article.publishedAt, "EEEE, MMMM io yyyy")}
                        </div>
                    </div>
                    <h1 className="text-3xl lg:text-5xl font-bold first-letter:uppercase">
                        {article.title}
                    </h1>
                    <h2 className="text-lg lg:text-xl text-muted-foreground">{article.description}</h2>
                </div>
            </div>
        </div>
    )
}