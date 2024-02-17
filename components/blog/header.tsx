import { cn } from "@/lib/utils";

interface BlogHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
    
}

export function BlogHeader({ children, className }: BlogHeaderProps) {
    return (
        <header className={cn(
            "flex items-center justify-between p-4",
            className
        )}>
            <div className="">
                <h1 className="font-semibold text-lg">Akieni</h1>
            </div>
            {children}
        </header>
    )
}