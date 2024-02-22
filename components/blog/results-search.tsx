import { Article } from "@/lib/validation"
import Link from "next/link"
import { Skeleton } from "../ui/skeleton"

interface SearchResultsProps {
    articles: Article[]
    handleClick: () => void
}

export function SearchResults({ articles, handleClick }: SearchResultsProps) {
    return (
        <>
            {articles.length === 0 ? (
                <div className="h-[200px] flex justify-center items-center">
                    <p className="text-sm font-light text-muted-foreground">
                        Oops!! No results for this search
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-2 p-4">
                    {articles.map((article, index) => (
                        <Link 
                            href={`/articles/${article.id}`} 
                            key={index} 
                            onClick={handleClick}
                            className="flex flex-col gap-2 p-2 rounded hover:border hover:bg-muted"
                        >
                            <h1 className="font-semibold">{article.title}</h1>
                            <p className="text-sm font-light">{article.description}</p>
                        </Link>
                    ))}
                </div>
            )}
        </>
    )
}

export function SearchingPlaceholder() {
    return (
        <div className="flex flex-col gap-6 p-4">
            <div className="space-y-2">
                <Skeleton className="h-8 w-2/5" />
                <Skeleton className="h-8 w-4/5" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-8 w-2/5" />
                <Skeleton className="h-8 w-4/5" />
            </div>
        </div>
    )
}