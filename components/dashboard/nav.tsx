"use client"

import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation"
import { HtmlHTMLAttributes, Suspense } from "react";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { MobileNav } from "./mobile-nav";
import { SignOutButton } from "./signout-button";

interface DashboardNavProps extends HtmlHTMLAttributes<HTMLElement> {
    items: NavItem[]
}

export function DashboardNav({ items, className }: DashboardNavProps) {
    const segment = useSelectedLayoutSegment()
    
    return  (
        <div className={cn("z-20 flex flex-col justify-between border shadow-2xl p-4 bg-gradient-to-b from-yellow-100/15 to-background", className)}>
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
                <Suspense fallback={(<div>Loading...</div>)}>
                    <SignOutButton />
                </Suspense>
            </div>
            <div className="block lg:hidden">
                <Suspense fallback={(<div>Loading...</div>)}>
                    <MobileNav items={items} />
                </Suspense>
            </div>
        </div>
    )
}