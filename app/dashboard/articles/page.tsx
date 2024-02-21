import { ArticleList } from "@/components/dashboard/article-list";
import { CreateArticleButton } from "@/components/dashboard/create-article-button";
import Pagination from "@/components/dashboard/pagination";
import Search from "@/components/dashboard/search";
import { DashboardShell } from "@/components/dashboard/shell";
import { CardListSkeleton } from "@/components/skeletons";
import { getArticlesPages } from "@/lib/utilsServer";
import { Suspense } from "react";

export default async function ArticlesPage({
    searchParams,
}: {
    searchParams?: {
      query?: string;
      page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await getArticlesPages(query);

    return (
        <DashboardShell 
            title="Articles" 
            action={(
                <CreateArticleButton />
            )}
            className="h-full pt-4"
        >
            <div className="w-full flex items-center gap-2 md:w-[300px]">
                <Search placeholder="Search articles..." />
            </div>
            <Suspense key={query + currentPage} fallback={<CardListSkeleton />}>
                <ArticleList query={query} currentPage={currentPage}  />
            </Suspense>
            <div className="flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </DashboardShell>
    )
}