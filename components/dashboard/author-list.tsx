import { getAuthors } from "@/lib/utilsServer"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export async function AuthorList() {
    const authors = await getAuthors()

    return (
        <div className="flex flex-col gap-4">
            {authors.map((author, index) => (
                <div className="flex items-center gap-2">
                    <Avatar key={index} className="w-8 h-8">
                        <AvatarImage src={author.image} alt="@techalchemist" />
                        <AvatarFallback>{author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-semibold">{author.name}</p>
                        <p className="text-xs font-light">{author.name}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}