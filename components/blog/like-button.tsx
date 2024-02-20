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
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { generateAfterAuthRedirectionLink } from "@/lib/utils"

interface Props {
    articleId: string
}

export function LikeButton({ articleId }: Props) {
    const { toast } = useToast()
    const router = useRouter()
    const { isSignedIn } = useAuth()

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

    const like = () => {
        if(isSignedIn) {
            execute({ articleId })
        } else {
            const authLink = generateAfterAuthRedirectionLink(window.location.href)
            router.push(authLink)
        }
    }

    return (
        <TooltipProvider>
            <Tooltip>
            <TooltipTrigger asChild>
                <button onClick={like}>
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