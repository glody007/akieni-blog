"use client"

import { Like } from "@/lib/validation"
import { formatDistance } from "date-fns"
import { AuthorBadgeList } from "../author-badge-list"
import { useGetLikes } from "@/data/get-likes"
import { DetailSkeleton } from "../skeletons"

interface Props {
    articleId: string
}

export function LikeItemList({ articleId }: Props) {
    const {data, isLoading} = useGetLikes(articleId)

    if(isLoading) return <DetailSkeleton />

    if(!data) return <div>Error</div>

    return (
        <div className="flex flex-col gap-4">
            {data.map((like, index) => (
                <Item key={index} like={like} />
            ))}
        </div>
    )
}

function Item({ like }: { like: Like }) {
    return (
        <div className="flex items-center gap-4">
            <AuthorBadgeList 
                size="lg"
                authors={[
                    { name: like.name, image: like.image }
                ]} 
            />
            <div className="flex flex-col">
                <p>{like.name}</p>
                <p className="text-xs font-light">
                    {formatDistance(like.createdAt, new Date(), { addSuffix: true })}
                </p>
            </div>
        </div>
    )
}