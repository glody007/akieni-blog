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
        <Link href={`/editor/${article.id}`} className={cn("flex flex-col gap-4 justify-between border rounded p-4", className)}>
            <h1 className="text-lg font-semibold">{article.title}</h1>
            <div className="flex justify-between items-center">
                <div className="w-[50%] flex gap-2">
                    <AuthorBadgeList authors={article.authors} />
                    <p className="text-nowrap text-ellipsis overflow-hidden text-muted-foreground text-sm">
                        {article.authors.length > 1 ? "Multiple authors" : article.authors[0].name}
                    </p>
                </div>
                <div className="justify-end text-nowrap text-muted-foreground text-sm">
                    {format(article.publishedAt, "MMM io yyyy")}
                </div>
            </div>
        </Link>
    )
}