import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CommentList } from "./comment-list"
import { AddCommentFormWithLogin } from "./add-comment-form"

interface CommentProps {
  articleId: string
  children?: React.ReactNode
}

export function Comment({ articleId, children }: CommentProps) {
  
  return (
    <Sheet>
        <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <SheetTrigger className="cursor-pointer" asChild>
                  <div className="cursor-pointer">
                    {children}
                  </div>
                </SheetTrigger>
              </TooltipTrigger>
              <TooltipContent>
                  <p>Respond</p>
              </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      <SheetContent className="sm:max-w-[425px] h-full overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Responses</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 pt-4">
          <AddCommentFormWithLogin articleId={articleId} />
          <CommentList articleId={articleId} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
