import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Article } from "@/lib/validation";
import { AuthorBadgeList } from "@/components/author-badge-list";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EditorHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
    article: Article
    handleSave: () => void
}

export function EditorHeader({ handleSave, article, className }: EditorHeaderProps) {
    return (
        <header className={cn(
            "flex items-center justify-between p-4",
            className
        )}>
            <div className="w-[50%] flex items-center gap-2">
                <Link href="/dashboard/articles">
                    <Icons.file className="h-6 w-6 md:w-8 md:h-8 text-muted-foreground" />
                </Link>
                <h1 className="font-light text-nowrap text-ellipsis overflow-hidden">
                    {article.title}
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <AuthorBadgeList size="md" authors={article.authors} />
                <Button onClick={handleSave}>
                    <Icons.save className="w-4 h-4 md:mr-2" />
                    <span className="hidden md:inline">Save</span>
                </Button>
            </div>
        </header>
    )
}