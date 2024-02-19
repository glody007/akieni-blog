import { notFound } from "next/navigation"
import { getArticle } from "@/lib/utilsServer"
import { Editor } from "@/components/editor/editor"
interface EditorPageProps {
    params: { id: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
    const article = await getArticle(params.id)

    if(!article) return notFound()

    return (
        <Editor article={article} />
    )
}