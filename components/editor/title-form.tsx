"use client"

import { useRef, useState } from "react";
import { useDetectClickOutside } from 'react-detect-click-outside';
import { Article } from "@/lib/validation";
import { Icons } from "../icons";
import { useToast } from "../ui/use-toast";
import { updateArticleTitle } from "@/server/actions";
import { useAction } from "next-safe-action/hooks";

interface Props {
    article: Article
}

export function TitleUpdateForm({ article }: Props) {
    const [title, setTitle] = useState(article.title)
    const { toast } = useToast()

    const inputRef = useRef<HTMLInputElement>(null)

    const { execute, status } = useAction(updateArticleTitle, {
        onSuccess: () => {
            toast({
                description: "Title changed",
            })
        },
        onError: () => {
            toast({
                description: "Something went wrong.",
                variant: "destructive"
            })
        }
    })

    const isLoading = status === "executing"

    const formRef = useDetectClickOutside({
        onTriggered: () => {
            inputRef.current?.blur()
            if(title === "" || title === article.title) {
                setTitle(article.title)
            } else {
                execute({ 
                    articleId: article.id,
                    title: title
                })
            }
        },
        triggerKeys: ['Enter', 'Escape'],
    });

    return (
        <div ref={formRef} className="flex items-center gap-2">
            <input 
                ref={inputRef}
                className="pl-1" 
                value={title} 
                onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}
            />
            {isLoading && (
                <div className="flex items-center text-muted-foreground text-xs gap-1">
                    <Icons.loader className="animate-spin w-4 h-4" />
                    <p className="hidden md:block text-thin">Saving...</p>
                </div>
            )}
        </div>
    )
}