import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Author } from "@/lib/validation"

interface AuthorBadgeListProps {
    authors: Author[],
    size?: "sm" | "md" | "lg"
}

export function AuthorBadgeList({ authors, size }: AuthorBadgeListProps) {
    return (
        <div>
            {authors.map((author, index) => (
                <Avatar key={index} 
                    className={cn(
                        { "w-5 h-5": size === "sm" || !size },
                        { "w-8 h-8": size === "md" },
                        { "w-10 h-10": size === "lg" },
                    )}
                >
                    <AvatarImage src={author.image} alt="@techalchemist" />
                    <AvatarFallback>{author.name[0]}</AvatarFallback>
                </Avatar>
            ))}
        </div>
    )
}