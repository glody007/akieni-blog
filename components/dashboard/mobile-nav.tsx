"use client"

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "@/components/ui/avatar"
import { Icons } from "@/components/icons"
import Link from "next/link"
import { useAuth, useUser } from "@clerk/nextjs";

interface MobileNavProps extends React.HTMLAttributes<HTMLHeadingElement> {
    items: NavItem[] 
}

export function MobileNav({ items, className }: MobileNavProps) {
    const { signOut } = useAuth()
    const { user } = useUser()

    if(!user) return <div>...</div>

    return (
        <div className={cn(
            "flex items-center justify-between",
            className
        )}>
            <Link href="/" className="flex items-center gap-2">
                <span className="block bg-foreground font-semibold text-xl text-background p-2 rounded-full">
                    <Icons.logo className="h-4 w-4" />
                </span>
                <h1 className="font-semibold text-md hidden md:block">{siteConfig.name}</h1>
            </Link>
            <div>
            <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer" asChild>
                    <Avatar>
                        <AvatarImage src={user.imageUrl} alt={user.username || ""} />
                        <AvatarFallback>{user.username}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mr-4">
                <DropdownMenuLabel className="font-light mb-2">{user.emailAddresses[0].emailAddress}</DropdownMenuLabel>
                <DropdownMenuGroup>
                    {items.map((item, index) => {
                        const Icon = Icons[item.icon]
                        return (
                            <Link key={index} href={item.href}>
                                <DropdownMenuItem>
                                    <Icon className="mr-2 h-4 w-4" />
                                    <span>{item.name}</span>
                                </DropdownMenuItem>
                            </Link>
                        )
                    })}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                    <Icons.logout className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </div>
    )
}