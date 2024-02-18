"use client"

import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation"
import { HtmlHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { MobileNav } from "./mobile-nav";

interface DashboardNavProps extends HtmlHTMLAttributes<HTMLElement> {
    items: NavItem[]
}

export function DashboardNav({ items, className }: DashboardNavProps) {
    const segment = useSelectedLayoutSegment()
    
    return  (
        <div className={cn("flex flex-col justify-between shadow-2xl p-4 bg-background", className)}>
            <div className="hidden lg:flex flex-col gap-10">
                <div className="flex justify-center p-2">
                    <Link href="/" className="flex flex-col items-center gap-2">
                        <span className="block bg-foreground font-semibold text-xl text-background p-4 rounded-full">
                            <Icons.logo className="h-8 w-8" />
                        </span>
                        <span className="text-md font-semibold">
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
                                className={cn(
                                    "flex items-center gap-2 text-sm p-2 text-foreground/80 hover:bg-muted",
                                    { "text-foreground bg-muted": item.href.endsWith(`/${segment}`) },
                                    { "text-foreground bg-muted": !segment &&  item.href === "/dashboard"}
                                )}
                            >
                                <Icon className="mr-2 w-4 h-4" />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div className="hidden lg:block">
                <Button variant="ghost" className="w-full justify-start">
                    <Icons.logout className="w-4 h-4 mr-2" />
                    Logout
                </Button>
            </div>
            <div className="block lg:hidden">
                <MobileNav items={items} />
            </div>
        </div>
    )
}