import { cn } from "@/lib/utils";
import { Article } from "@/lib/validation";
import { format } from "date-fns";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { AuthorBadgeList } from "../author-badge-list";

interface ArticleItemProps extends HTMLAttributes<HTMLElement> {
    article: Article
}

export function Article({ article, className }: ArticleItemProps) {
    return (
        <Link href={`/articles/${article.id}`} className={cn("flex flex-col gap-1", className)}>
            <p className="text-xs text-muted-foreground font-light">{article.category}</p>
            <h1 className="text-foreground text-2xl font-semibold">{article.title}</h1>
            <div className="flex items-center gap-4">
                <AuthorBadgeList authors={article.authors} />
                <p className="text-xs text-muted-foreground font-light">
                    {format(article.publishedAt, "MMM dd yyyy")}
                </p>
            </div>
        </Link>
    )
}