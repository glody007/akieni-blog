"use client"

import React from "react"
import EditorJS from "@editorjs/editorjs"
import { Article } from "@/lib/validation"
import { EditorHeader } from "./header"
import { useToast } from "@/components/ui/use-toast"
import { useAction } from "next-safe-action/hooks"
import { updateArticleBody } from "@/server/actions"
import { ImageUpload } from "./image-upload"
import { AiGenerationButton } from "./ai-generation-button"

interface EditorProps {
    article: Article
}

export function Editor({ article }: EditorProps) {
    const [isMounted, setIsMounted] = React.useState<boolean>(false)
    const editorRef = React.useRef<EditorJS>()
    const { toast } = useToast()

    const { execute, status } = useAction(updateArticleBody, {
        onSuccess: () => {
            toast({
                description: "Saved successfully",
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

    const initializeEditor = React.useCallback(async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default
        const Header = (await import("@editorjs/header")).default
        // @ts-ignore
        const Embed = (await import("@editorjs/embed")).default
        // @ts-ignore
        const Table = (await import("@editorjs/table")).default
        // @ts-ignore
        const List = (await import("@editorjs/list")).default
        // @ts-ignore
        const Code = (await import("@editorjs/code")).default
        // @ts-ignore
        const LinkTool = (await import("@editorjs/link")).default

        if (!editorRef.current) {  
          const data = JSON.parse(article.body)
          const editor = new EditorJS({
            holder: "editor",
            onReady() {
              editorRef.current = editor
            },
            placeholder: "Write your article...",
            inlineToolbar: true,
            data: data,
            tools: {
              header: Header,
              linkTool: LinkTool,
              list: List,
              code: Code,
              table: Table,
              embed: Embed,
            },
          })
        }
    }, [article])
    
    React.useEffect(() => {
        if (typeof window !== "undefined") {
          setIsMounted(true)
        }
    }, [])
    
    React.useEffect(() => {
        if (isMounted) {
            initializeEditor()

            return () => {
                editorRef.current?.destroy()
                editorRef.current = undefined
            }
        }
    }, [isMounted, initializeEditor])

    const save = async () => {
        const data = await editorRef.current?.save()
        execute({ 
            articleId: article.id, 
            body: data 
        })
    }

    return (
        <div className="flex flex-col gap-8 md:gap-16 min-h-screen">
            <div className="z-50 sticky top-0 border-b">
                <EditorHeader article={article} isSaving={isLoading} handleSave={save} />
            </div>
            <div className="z-0 mx-auto w-full flex flex-col gap-16 max-w-5xl p-4">
                <ImageUpload article={article} />
                <div id="editor" className="min-h-[500px]" />
            </div>
            <div className="sticky flex justify-end bottom-8 pr-8">
                <AiGenerationButton articleId={article.id} />
            </div>
        </div>
    )
}