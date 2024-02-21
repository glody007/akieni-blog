import { Skeleton } from "./ui/skeleton";

export function DetailSkeleton() {
    return (
        <div className="p-4">
            <div className="space-y-3">
            <Skeleton className="h-5 w-2/5" />
            <Skeleton className="h-4 w-4/5" />
            </div>
        </div>
    )
}

export function CardSkeleton() {
    return (
        <div className="p-4 border">
            <div className="space-y-3">
            <Skeleton className="h-5 w-2/5" />
            <Skeleton className="h-4 w-4/5" />
            </div>
        </div>
    )
}

export function EditorSkeleton() {
  return (
    <div className="grid w-full gap-10 py-16">
      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-[38px] w-[90px]" />
        <Skeleton className="h-[38px] w-[80px]" />
      </div>
      <div className="mx-auto w-[800px] space-y-6">
        <Skeleton className="h-[50px] w-full" />
        <Skeleton className="h-[20px] w-2/3" />
        <Skeleton className="h-[20px] w-full" />
        <Skeleton className="h-[20px] w-full" />
      </div>
    </div>
  )
}

export function ArticleSkeleton() {
    return (
      <div className="grid w-full gap-10 py-16">
        <div className="mx-auto w-[800px] space-y-6">
          <Skeleton className="h-[50px] w-full" />
          <Skeleton className="h-[20px] w-2/3" />
          <Skeleton className="h-[20px] w-full" />
          <Skeleton className="h-[20px] w-full" />
        </div>
      </div>
    )
}