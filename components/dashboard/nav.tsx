import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import Link from "next/link";
import { HtmlHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";

interface DashboardNavProps extends HtmlHTMLAttributes<HTMLElement> {
    items: NavItem[]
}

export function DashboardNav({ items, className }: DashboardNavProps) {
    return  (
        <div className={cn("flex flex-col justify-between shadow-2xl p-4", className)}>
            <div className="flex flex-col gap-16">
                <div className="flex p-2">
                    <Link href="/" className="flex items-center  gap-2">
                        <Icons.logo className="h-8 w-8" />
                        <span className=" bg-foreground font-semibold text-xl text-background px-3 py-2">
                            {siteConfig.name}
                        </span>
                    </Link>
                </div>
                <nav>
                    {items.map((item, index) => {
                        const Icon = Icons[item.icon]
                        return (
                            <Link 
                                key={index} 
                                href={item.href}
                                className="flex items-center gap-2 text-sm p-2 hover:bg-muted"
                            >
                                <Icon className="mr-2 w-4 h-4" />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div>
                <Button variant="ghost" className="w-full justify-start">
                    <Icons.logout className="w-4 h-4 mr-2" />
                    Logout
                </Button>
            </div>
        </div>
    )
}