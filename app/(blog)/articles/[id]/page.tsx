import { ArticleActions } from "@/components/blog/article-actions";
import { ArticleAuthorList } from "@/components/blog/article-author-list";
import { ArticleBody } from "@/components/blog/article-body";
import { ArticleDetailsHeader } from "@/components/blog/article-details-header";
import { RelatedArticleList } from "@/components/blog/related-article-list";
import { Icons } from "@/components/icons";
import { DetailSkeleton } from "@/components/skeletons";
import { Skeleton } from "@/components/ui/skeleton";
import { getArticle, getArticles } from "@/lib/utilsServer"
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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
        <div className="min-h-screen flex flex-col items-center p-4 pb-16 bg-gradient-to-b from-cyan-100/25 to-background">
            <div className="w-full flex flex-col gap-10 lg:gap-16 max-w-6xl">
                <Link href="/" className="flex items-center cursor-pointer text-sm text-muted-foreground font-light hover:text-foreground">
                    <Icons.arrowLeft className="w-4 h-4 mr-2" />
                    Back to blog
                </Link>
                <div className="grid lg:grid-cols-[1fr_280px]">
                    <ArticleDetailsHeader article={article} />
                    {article.image && (
                        <div className="mt-4 border rounded lg:rounded lg:border-none lg:pt-0 relative min-h-[200px]">
                            <Image src={article.image} fill objectFit="cover" alt={article.title} />
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-16 lg:gap-0 lg:grid lg:grid-cols-[1fr_280px] lg:min-h-screen lg:divide-x">
                    <div className="lg:pr-8" data-testid="body">
                        <ArticleBody article={article} />
                    </div>
                    <div className="flex flex-col gap-8 lg:pl-4">
                        <div className="flex flex-col gap-4">
                            <p className="text-sm text-muted-foreground font-light">
                                Posted by
                            </p>
                            <ArticleAuthorList authors={article.authors} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="text-sm text-muted-foreground font-light">
                                Related Articles
                            </p>
                            <Suspense fallback={(<DetailSkeleton />)}>
                                <RelatedArticleList article={article} />
                            </Suspense>
                        </div>
                    </div>
                </div>
                <div className="grid lg:grid-cols-[1fr_280px]">
                    <Suspense fallback={(<Skeleton />)}>
                        <ArticleActions id={article.id} />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}