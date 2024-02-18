import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "@/components/ui/avatar"
import { Author } from "@/lib/validation"

interface Props {
    authors: Author[]
}

export function ArticleAuthorList({ authors }: Props) {
    return (
        <div className="flex flex-col gap-4">
            {authors.map((author, index) => (
                <div className="flex items-center gap-2">
                    <Avatar key={index} className="w-8 h-8">
                        <AvatarImage src={author.image} alt="@techalchemist" />
                        <AvatarFallback>{author.name[0]}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-semibold">{author.name}</p>
                </div>
            ))}
        </div>
    )
}