"use client"

import React from "react"
import EditorJS from "@editorjs/editorjs"
import { Article } from "@/lib/validation"

interface ArticleBodyProps {
    article: Article
}

export function ArticleBody({ article }: ArticleBodyProps) {
    const [isMounted, setIsMounted] = React.useState<boolean>(false)
    const editorRef = React.useRef<EditorJS>()

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
            readOnly: true
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

    return (
        <div>
            <div className="mx-auto w-full flex flex-col gap-16 max-w-5xl p-4">
                <div id="editor" className="min-h-[500px]" />
            </div>
        </div>
    )
}