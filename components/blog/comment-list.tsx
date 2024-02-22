"use client"

import { useGetComments } from "@/data/get-comments"
import { Comment, Comment as CommentType } from "@/lib/validation"
import { formatDistance } from "date-fns"
import { AuthorBadgeList } from "../author-badge-list"
import { DetailSkeleton } from "../skeletons"
import { AddCommentFormWithLogin } from "./add-comment-form"
import { useOptimisticAction } from "next-safe-action/hooks"
import { postComment } from "@/server/actions"
import { useUser } from "@clerk/nextjs"
import { useToast } from "../ui/use-toast"

interface ArticleIdProps {
    articleId: string
}

export function CommentsSections({ articleId }: ArticleIdProps) {
    const {data, isLoading} = useGetComments(articleId)
    const { user, isLoaded } = useUser()

    if(isLoading || !isLoaded) return <DetailSkeleton />

    if(!data) return <div>Error</div>

    return (
        <OptimisticCommentsSection 
            comments={data} 
            articleId={articleId} 
            name={user ? `${user.firstName} ${user.lastName}` : ""}
            image={user ? user.imageUrl : ""}
        />
    )
}

interface OptimisticCommentsSectionProps {
    articleId: string
    comments: Comment[]
    name: string
    image: string
}

export function OptimisticCommentsSection({ comments, articleId, name, image }: OptimisticCommentsSectionProps) {
    const { toast } = useToast()
    const { execute, result, optimisticData, status } = useOptimisticAction(
        postComment,
        { comments },
        (state, { body, articleId }) => {
            const comments = state.comments
            if(comments) {
                return Object.freeze({ 
                     comments: [
                        ...comments,
                        {
                            articleId,
                            name,
                            image,
                            body,
                            createdAt: new Date()
                        }
                    ],
                })
            }
            return { error: true }
        },
        {
            onSuccess: () => {
                toast({
                    description: "Your comment has been posted.",
                })
            },
            onError: () => {
                toast({
                    description: "Something went wrong.",
                    variant: "destructive"
                })
            }
        }
    );

    const isLoading = status === "executing"

    const { comments: optimisticComments } = optimisticData

    return (
        <div className="flex flex-col gap-4 pt-4">
            <AddCommentFormWithLogin 
                articleId={articleId}  
                handleExecute={execute}
                isLoading={isLoading}
            />
            <CommentList comments={optimisticComments || []} />
        </div>
    )
}

interface CommentListProps {
    comments: readonly Comment[]
}

export function CommentList({ comments }: CommentListProps) {
    return (
        <div className="flex flex-col gap-4">
            {comments.map((comment, index) => (
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