"use client"

import { Article } from "@/lib/validation"
import { EditorHeader } from "./header"

interface EditorProps {
    article: Article
}

export function Editor({ article }: EditorProps) {
    const save = () => {
        console.log("save")
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="sticky top-0 border-b">
                <EditorHeader article={article} handleSave={save} />
            </div>
            <div>
                
            </div>
        </div>
    )
}