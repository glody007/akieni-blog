import { Icons } from "../icons"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import Chat from "./chat"

interface Props {
    articleId: string
}

export function AiChatButton({ articleId }: Props) {
    return (
        <Dialog>
            <DialogTrigger>
                <span>
                    <Icons.ai className="w-4 h-5 text-violet-500" />
                </span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Ask question about the article
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <Chat articleId={articleId} />
                </div>
            </DialogContent>
        </Dialog>
    )
}