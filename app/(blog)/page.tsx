import { ArticleList } from "@/components/blog/article-list";
import { FeaturedArticleList } from "@/components/blog/featured-article-list";
import { getFeaturedArticles } from "@/lib/utilsServer";
import { getPaginatedArticles } from "@/server/actions";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

export default async function Blog() {
  const queryClient = new QueryClient()

  const featuredArticles = await getFeaturedArticles()

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["articles"],
    queryFn: async ({ pageParam }) => getPaginatedArticles(pageParam),
    initialPageParam: 1
  })

  return (
    <div className="min-h-screen flex flex-col items-center p-4 py-16">
      <div className="w-full flex flex-col gap-16 max-w-6xl">
        {featuredArticles.length >= 5 && (
          <div className="flex flex-col gap-5 lg:gap-10">
            <h1 className="text-3xl lg:text-5xl font-semibold">Featured</h1>
            <FeaturedArticleList articles={featuredArticles} />
          </div>
        )}
        <div className="flex flex-col gap-5 lg:gap-10">
          <h1 className="text-3xl lg:text-5xl font-semibold">Latest</h1>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ArticleList />
          </HydrationBoundary>
        </div>
      </div>
    </div>
  );
}


