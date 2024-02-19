import { getArticleComments } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";

export function useGetComments(articleId: string) {
    return useQuery({
        queryFn: async () => getArticleComments(articleId),
        queryKey: ["comments"],
        refetchInterval: 5000
    })
}