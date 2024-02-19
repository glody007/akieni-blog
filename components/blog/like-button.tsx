import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "../icons"

interface Props {
    articleId: string
}

export function LikeButton({ articleId }: Props) {
    return (
        <TooltipProvider>
            <Tooltip>
            <TooltipTrigger asChild>
                <div className="cursor-pointer">
                    <Icons.heart className="w-5 h-5" />
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p>Like</p>
            </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}