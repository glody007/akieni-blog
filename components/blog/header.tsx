import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "../icons";

interface BlogHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
    
}

export function BlogHeader({ children, className }: BlogHeaderProps) {
    return (
        <header className={cn(
            "flex items-center justify-between p-4",
            className
        )}>
            <Link href="/" className="flex items-center gap-2">
                <span className="block bg-foreground font-semibold text-xl text-background p-2 rounded-full">
                    <Icons.logo className="h-4 w-4" />
                </span>
                <h1 className="font-semibold text-md hidden md:block">{siteConfig.name}</h1>
            </Link>
            <div className="relative">
                {children}
            </div>
        </header>
    )
}