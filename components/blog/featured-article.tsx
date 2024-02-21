import { cn } from "@/lib/utils";
import { Article } from "@/lib/validation";
import { format } from "date-fns";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { AuthorBadgeList } from "../author-badge-list";
import Image from "next/image";

interface FeaturedArticleItemProps extends HTMLAttributes<HTMLElement> {
    article: Article
}

export function FeaturedArticle({ article, className }: FeaturedArticleItemProps) {
    return (
        <Link href={`/articles/${article.id}`} className={cn("relative flex flex-col gap-4 justify-end bg-gradient-to-t from-foreground/100 to-foreground/70 hover:to-foreground/30 border rounded p-4", className)}>
            {article.image && (
                <div className="absolute inset-0">
                    <div className="relative h-full w-full -z-50">
                        <Image objectFit="cover" fill src={article.image} alt={article.title} />
                    </div>
                </div>
            )}
            <h1 className="text-white text-lg font-semibold">{article.title}</h1>
            <div className="flex justify-between items-center">
                <div className="w-[70%] flex gap-2">
                    <AuthorBadgeList authors={article.authors} />
                    <p className="text-nowrap text-ellipsis overflow-hidden text-muted-foreground text-sm">
                        {article.authors.length > 1 ? "Multiple authors" : article.authors[0].name}
                    </p>
                </div>
                <div className="w-[25%] justify-end text-nowrap text-muted-foreground text-sm">
                    {format(article.publishedAt, "MMM io yyyy")}
                </div>
            </div>
        </Link>
    )
}