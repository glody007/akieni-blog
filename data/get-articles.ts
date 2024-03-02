import { getPaginatedArticles } from "@/server/actions";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useGetArticles() {
    return useInfiniteQuery({
        queryFn: async ({ pageParam }) => getPaginatedArticles(pageParam),
        queryKey: ["articles"],
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage ? lastPage.nextCursor : 2,
    })
}