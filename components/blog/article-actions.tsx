import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { getArticleInteractions } from "@/lib/utilsServer"
import { Icons } from "../icons"
import { LikeList } from "./like-list"
import { Comment } from "./comment"
import { LikeButton } from "./like-button"

interface Props {
    id: string
}

export async function ArticleActions({ id }: Props) {
    const interactions = await getArticleInteractions(id)
    
    return (
        <div className="mr-auto flex items-start gap-6 text-sm text-muted-foreground font-light px-3 py-2 rounded-2xl bg-muted">
            <div className="flex items-center gap-2">
                <LikeButton articleId={id} />
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
        </div>
    )
}