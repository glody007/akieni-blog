import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getUserAndCreateIfHeNotExist } from "@/lib/utilsServer"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function defaultNotAuthorPage() {
    const user = await getUserAndCreateIfHeNotExist()

    if(!user) redirect('/')
  
    if(user.author) redirect('/dashboard')

    return (
        <div className="min-h-[600px] w-full flex flex-col gap-2 justify-center items-center">
            <h1 className="font-bold text-3xl">Your are not an author</h1>
            <Link href="/" className={cn(buttonVariants({ variant: "ghost" }))}>
                <Icons.arrowLeft className="mr-2 w-4 h-4" />
                Visite the blog
            </Link>
        </div>
    )
}