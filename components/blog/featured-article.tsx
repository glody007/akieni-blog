import { cn } from "@/lib/utils";
import { Article } from "@/lib/validation";
import { format } from "date-fns";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { AuthorBadgeList } from "../author-badge-list";

interface FeaturedArticleItemProps extends HTMLAttributes<HTMLElement> {
    article: Article
}

export function FeaturedArticle({ article, className }: FeaturedArticleItemProps) {
    return (
        <Link href={`/articles/${article.id}`} className={cn("flex flex-col gap-4 justify-end bg-black border rounded p-4", className)}>
            <h1 className="text-white text-lg font-semibold">{article.title}</h1>
            <div className="flex justify-between items-center">
                <div className="w-[70%] flex gap-2">
                    <AuthorBadgeList authors={article.authors} />
                    <p className="text-nowrap text-ellipsis overflow-hidden text-muted-foreground text-sm">
                        {article.authors.length > 1 ? "Multiple authors" : article.authors[0].name}
                    </p>
                </div>
                <div className="w-[25%] justify-end text-nowrap text-muted-foreground text-sm">
                    {format(article.publishedAt, "MMM dd yyyy")}
                </div>
            </div>
        </Link>
    )
}