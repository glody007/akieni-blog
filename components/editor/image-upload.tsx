"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Article } from "@/lib/validation"
import Image from "next/image"
import { Icons } from "../icons"
import { useState } from "react"
  
interface Props {
    article: Article
}
  
export function ImageUpload({ article }: Props) {
    const [open, setOpen] = useState(false)

    return (
      <div> 
        <TriggerPlaceholder article={article} handleClick={() => setOpen(true)} />
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Update article image</DialogTitle>
            </DialogHeader>
            <div>
                content
            </div>
            </DialogContent>
        </Dialog>
      </div>
    )
}

interface TriggerProps {
    article: Article
    handleClick: () => void
}

function TriggerPlaceholder({ article, handleClick }: TriggerProps) {
    return (
        <div className="h-[200px] w-full">
            {article.image ? (
                <button onClick={handleClick} className="relative h-full w-full">
                    <Image fill objectFit="cover" src={article.image} alt={article.title} />
                    <div className="absolute inset-0 hover:bg-foreground/50" />
                    <div className="absolute top-4 right-4 p-2 bg-foreground/60 rounded-full border-spacing-0">
                        <Icons.update className="w-4 h-4 text-white" />
                    </div>
                </button>
            ) : (
                <button onClick={handleClick} className="h-full w-full flex justify-center items-center bg-muted rounded">
                    <div className="flex items-center text-sm font-light text-muted-foreground gap-2">
                        <Icons.picture />
                        <p>
                            Add image
                        </p>
                    </div>
                </button>
            )}
        </div>
    )
}
  