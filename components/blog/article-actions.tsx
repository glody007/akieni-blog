import { getArticleInteractions } from "@/lib/utilsServer"
import { Icons } from "../icons"

interface Props {
    id: string
}

export async function ArticleActions({ id }: Props) {
    const interactions = await getArticleInteractions(id)
    
    return (
        <div className="flex items-start gap-6 text-xs text-muted-foreground font-light">
            <div className="flex items-center gap-1">
                <Icons.heart className="w-5 h-5" />
                <p>{interactions.comments.length}</p>
            </div>
            <div className="flex items-center gap-1">
                <Icons.message className="w-5 h-5" />
                <p>{interactions.likes.length}</p>
            </div>
        </div>
    )
}