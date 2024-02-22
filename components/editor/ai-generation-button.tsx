import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Icons } from "../icons"
import { useToast } from "../ui/use-toast"
import { useAction } from "next-safe-action/hooks"
import { generateArticleBody } from "@/server/actions"

interface Props {
    articleId: string
}

export function AiGenerationButton({ articleId }: Props) {
    const { toast } = useToast()
    const { execute, status } = useAction(generateArticleBody, {
        onSuccess: () => {
            toast({
                description: "Content generated successfully",
                duration: 1000
            })
        },
        onError: () => {
            toast({
                description: "Something went wrong.",
                variant: "destructive"
            })
        }
    })

    const generate = () => {
        execute({ articleId })
    }

    const isLoading = status === "executing"

    return (
        <Popover>
        <PopoverTrigger asChild>
            <Button variant="outline" className="rounded-full">
                <Icons.ai className="h-6 w-6 text-violet-500" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 mr-4">
            <div className="grid gap-4">
            <div className="space-y-2">
                <h4 className="font-medium leading-none">Generate content</h4>
                <p className="text-sm text-muted-foreground">
                    Akienist will use the article&apos;s title to generate the body.
                </p>
            </div>
            <div className="grid gap-2">
                <Button onClick={generate}>
                    {isLoading ? (
                        <Icons.loader className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                        <Icons.ai className="h-4 w-4 mr-2" />
                    )}
                    Generate
                </Button>
            </div>
            </div>
        </PopoverContent>
        </Popover>
    )
}
