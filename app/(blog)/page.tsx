import { FeaturedArticleList } from "@/components/blog/featured-article-list";
import { getArticles, getFeaturedArticles } from "@/lib/utilsServer";

export default async function Blog() {
  const featuredArticles = await getFeaturedArticles()
  const allArticles = await getArticles()

  return (
    <div className="min-h-screen flex flex-col items-center p-4 py-16">
      <div className="w-full flex-col gap-8 lg:gap-16 max-w-6xl">
        {featuredArticles.length >= 5 && (
          <div className="flex flex-col gap-5 lg:gap-10">
            <h1 className="text-3xl lg:text-5xl font-semibold">Featured</h1>
            <FeaturedArticleList articles={featuredArticles} />
          </div>
        )}
      </div>
    </div>
  );
}


