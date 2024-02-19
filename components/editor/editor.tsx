"use client"

import React from "react"
import EditorJS from "@editorjs/editorjs"
import { Article } from "@/lib/validation"
import { EditorHeader } from "./header"

interface EditorProps {
    article: Article
}

export function Editor({ article }: EditorProps) {
    const [isMounted, setIsMounted] = React.useState<boolean>(false)
    const editorRef = React.useRef<EditorJS>()

    const initializeEditor = React.useCallback(async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default
        const Header = (await import("@editorjs/header")).default
        const Embed = (await import("@editorjs/embed")).default
        const Table = (await import("@editorjs/table")).default
        const List = (await import("@editorjs/list")).default
        const Code = (await import("@editorjs/code")).default
        const LinkTool = (await import("@editorjs/link")).default

    
        if (!editorRef.current) {
          const editor = new EditorJS({
            holder: "editor",
            onReady() {
              editorRef.current = editor
            },
            placeholder: "Write your article...",
            inlineToolbar: true,
            data: article.body,
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
        console.log(data)
    }

    return (
        <div className="flex flex-col gap-8 md:gap-16 min-h-screen">
            <div className="sticky top-0 border-b">
                <EditorHeader article={article} handleSave={save} />
            </div>
            <div className="w-full flex flex-col gap-16 max-w-5xl p-4">
                <div id="editor" className="min-h-[500px]" />
            </div>
        </div>
    )
}