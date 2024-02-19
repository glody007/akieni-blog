import { getArticleLikes } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";

export function useGetLikes(articleId: string) {
    return useQuery({
        queryFn: async () => getArticleLikes(articleId),
        queryKey: ["likes"],
        refetchInterval: 5000
    })
}