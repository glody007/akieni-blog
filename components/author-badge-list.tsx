import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "@/components/ui/avatar"
import { Author } from "@/lib/validation"

interface AuthorBadgeListProps {
    authors: Author[]
}

export function AuthorBadgeList({ authors }: AuthorBadgeListProps) {
    return (
        <div>
            {authors.map((author, index) => (
                <Avatar key={index} className="w-5 h-5">
                    <AvatarImage src={author.image} alt="@techalchemist" />
                    <AvatarFallback>{author.name[0]}</AvatarFallback>
                </Avatar>
            ))}
        </div>
    )
}