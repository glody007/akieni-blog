"use client"

import { useGetComments } from "@/data/get-comments"
import { Comment as CommentType } from "@/lib/validation"
import { formatDistance } from "date-fns"
import { AuthorBadgeList } from "../author-badge-list"
import { DetailSkeleton } from "../skeletons"

interface Props {
    articleId: string
}

export function CommentList({ articleId }: Props) {
    const {data, isLoading} = useGetComments(articleId)

    if(isLoading) return <DetailSkeleton />

    if(!data) return <div>Error</div>

    return (
        <div className="flex flex-col gap-4">
            {data.map((comment, index) => (
                <Item key={index} comment={comment} />
            ))}
        </div>
    )
}

function Item({ comment }: { comment: CommentType }) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
            <AuthorBadgeList 
                authors={[
                    { name: comment.name, image: comment.image }
                ]} 
            />
            <div className="flex flex-col">
                <p>{comment.name}</p>
                <p className="text-xs font-light">
                    {formatDistance(comment.createdAt, new Date(), { addSuffix: true })}
                </p>
            </div>
        </div>
        <div>
            <p className="font-light">{comment.body}</p>
        </div>
      </div>
    )
}