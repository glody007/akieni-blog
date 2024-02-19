import { cn } from "@/lib/utils";
import { Article } from "@/lib/validation";
import { format } from "date-fns";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { AuthorBadgeList } from "../author-badge-list";

interface RelatedItemProps extends HTMLAttributes<HTMLElement> {
    article: Article
}

export function RelatedArticle({ article, className }: RelatedItemProps) {
    return (
        <Link href={`/articles/${article.id}`} className={cn("flex flex-col gap-1", className)}>
            <p className="text-foreground text-sm font-semibold">{article.title}</p>
            <div className="flex items-center gap-4">
                <AuthorBadgeList authors={article.authors} />
                <p className="text-xs text-muted-foreground font-light">
                    {format(article.publishedAt, "MMM io yyyy")}
                </p>
            </div>
        </Link>
    )
}