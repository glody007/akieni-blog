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
import { cn, generateAfterAuthRedirectionLink } from "@/lib/utils"

interface Props {
    articleId: string
    liked: boolean
}

export function LikeButton({ articleId, liked }: Props) {
    const { toast } = useToast()
    const router = useRouter()
    const { isSignedIn } = useAuth()

    const { execute, status } = useAction(toggleLike, {
        onSuccess: (data) => {
            toast({
                description: data.message,
                duration: 2000
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
                    <Icons.heart className={cn("w-5 h-5", {"font-bold text-cyan-500": liked})} />
                </button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Like</p>
            </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}