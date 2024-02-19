import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>Responses</SheetTitle>
          <SheetDescription>
            List of responses
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          
        </div>
      </SheetContent>
    </Sheet>
  )
}
