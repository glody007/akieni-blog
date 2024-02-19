import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Textarea } from "../ui/textarea"

interface LikeListProps {
  articleId: string
  children?: React.ReactNode
}

export function LikeList({ articleId, children }: LikeListProps) {
  return (
    <Dialog>
        <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger className="cursor-pointer" asChild>
                  <div>
                    {children}
                  </div>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                  <p>View likes</p>
              </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      <DialogContent className="sm:max-w-[425px] border-none bg-none shadow-none">
        <DialogHeader>
          <DialogTitle>People who liked the article</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            
        </div>
      </DialogContent>
    </Dialog>
  )
}
