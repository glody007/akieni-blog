import { CreateArticleButton } from "@/components/dashboard/create-article-button";
import { DashboardShell } from "@/components/dashboard/shell";

export default function ArticlesPage() {
    return (
        <DashboardShell 
            title="Articles" 
            action={(
                <CreateArticleButton />
            )}
            className="h-full pt-4"
        >

        </DashboardShell>
    )
}