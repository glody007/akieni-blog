import { getSearchedArticles } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";

export function useGetSearchedArticles(query: string) {
    return useQuery({
        queryFn: async () => getSearchedArticles(query),
        queryKey: ["search"]
    })
}