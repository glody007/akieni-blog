import { getArticleInteractions, getUserAndCreateIfHeNotExist } from "@/lib/utilsServer"
import { Icons } from "../icons"
import { LikeList } from "./like-list"
import { Comment } from "./comment"
import { LikeButton } from "./like-button"
import { AiChatButton } from "./ai-chat-button"

interface Props {
    id: string
}

export async function ArticleActions({ id }: Props) {
    const interactions = await getArticleInteractions(id)
    const user = await getUserAndCreateIfHeNotExist()
    
    const liked = (
        user !== null && 
        interactions.likes.findIndex(like => like.userId === user.id) > -1
    )

    return (
        <div className="mr-auto flex items-start gap-6 text-sm text-muted-foreground font-light px-3 py-2 rounded-2xl bg-muted">
            <div className="flex items-center gap-2">
                <LikeButton articleId={id} liked={liked}  />
                <LikeList articleId={id}> 
                    <p>{interactions.likes.length}</p>
                </LikeList>
            </div>
            <Comment articleId={id}>
                <div className="flex items-center gap-2">
                    <Icons.message className="w-5 h-5" />
                    <p>{interactions.comments.length}</p>
                </div>
            </Comment>
            <AiChatButton articleId={id} />
        </div>
    )
}