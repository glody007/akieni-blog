import { ArticleList } from "@/components/dashboard/article-list";
import { CreateArticleButton } from "@/components/dashboard/create-article-button";
import { DashboardShell } from "@/components/dashboard/shell";
import { Suspense } from "react";

export default function ArticlesPage() {
    return (
        <DashboardShell 
            title="Articles" 
            action={(
                <CreateArticleButton />
            )}
            className="h-full pt-4"
        >
            <Suspense fallback={<div>Loading...</div>}>
                <ArticleList />
            </Suspense>
        </DashboardShell>
    )
}