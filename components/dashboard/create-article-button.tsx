"use client"

import { useRouter } from "next/navigation";
import { Icons } from "../icons";
import { Button } from "../ui/button";

export function CreateArticleButton() {
    const router = useRouter()

    const createArticle = () => {
        router.push("/editor/1")
    }

    return (
        <Button onClick={createArticle}>
            <Icons.plus className="w-4 h-4 mr-2" />
            New article
        </Button>
    )
}