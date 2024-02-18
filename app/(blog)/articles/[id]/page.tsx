import { ArticleAuthorList } from "@/components/blog/article-author-list";
import { ArticleDetailsHeader } from "@/components/blog/article-details-header";
import { Icons } from "@/components/icons";
import { getArticle, getArticles } from "@/lib/utilsServer"
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
                <div className="grid lg:grid-cols-[1fr_280px]">
                    <ArticleDetailsHeader article={article} />
                </div>
                <div className="flex flex-col gap-16 lg:gap-0 lg:grid lg:grid-cols-[1fr_280px] lg:min-h-screen lg:divide-x">
                    <div className="lg:pr-8">
                        {article.body}
                    </div>
                    <div className="flex flex-col gap-4 lg:pl-4">
                        <p className="text-sm text-muted-foreground font-light">
                            Posted by
                        </p>
                        <ArticleAuthorList authors={article.authors} />
                    </div>
                </div>
            </div>
        </div>
    )
}