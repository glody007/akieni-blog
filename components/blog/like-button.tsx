"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/icons"
import { useToast } from "@/components/ui/use-toast"
import { toggleLike } from "@/server/actions"
import { useAction } from "next-safe-action/hooks"

interface Props {
    articleId: string
}

export function LikeButton({ articleId }: Props) {
    const { toast } = useToast()

    const { execute, status } = useAction(toggleLike, {
        onSuccess: () => {
            toast({
                description: "Liked successfully",
            })
        },
        onError: () => {
            toast({
                description: "Something went wrong.",
                variant: "destructive"
            })
        }
    })

    return (
        <TooltipProvider>
            <Tooltip>
            <TooltipTrigger asChild>
                <button onClick={() => execute({ articleId })}>
                    <Icons.heart className="w-5 h-5" />
                </button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Like</p>
            </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}