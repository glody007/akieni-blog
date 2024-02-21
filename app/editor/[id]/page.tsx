import { notFound, redirect } from "next/navigation"
import { getArticle, getUserAndCreateIfHeNotExist } from "@/lib/utilsServer"
import { Editor } from "@/components/editor/editor"
interface EditorPageProps {
    params: { id: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
    const user = await getUserAndCreateIfHeNotExist()

    if(!user) redirect('/not-author')
  
    if(!user.author) redirect('/not-author')

    const article = await getArticle(params.id)

    if(!article) return notFound()

    return (
        <Editor article={article} />
    )
}