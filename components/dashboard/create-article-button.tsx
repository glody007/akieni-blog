"use client"

import { useRouter } from "next/navigation";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { createArticle } from "@/server/actions";
import { useAction } from "next-safe-action/hooks";

export function CreateArticleButton() {
    const router = useRouter()
    const { toast } = useToast()

    const { execute, status } = useAction(createArticle, {
        onSuccess: (data) => {
            router.push(`/editor/${data.articleId}`)
            toast({
                description: "Redirection to the editor.",
            })
        },
        onError: () => {
            toast({
                description: "Something went wrong.",
                variant: "destructive"
            })
        }
      })

    const create = () => {
        execute({})
    }

    const isLoading = status === "executing"

    return (
        <Button onClick={create}>
            {isLoading ? (
                <Icons.loader className="mr-2 w-4 h-4" />
            ) : (
                <Icons.plus className="w-4 h-4 mr-2" />
            )}
            New article
        </Button>
    )
}