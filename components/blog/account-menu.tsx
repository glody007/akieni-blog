"use client"

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
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { Skeleton } from "../ui/skeleton"
  
export function AccountMenu() {
    const { isSignedIn, signOut } = useAuth()
    const { user } = useUser()
    const router = useRouter()

    const signIn = () => {
      router.push("dashboard")
    }

    if(!user) return <Skeleton className="w-8 h-8 rounded-full" />

    return (
      <div className="flex gap-2">
        {isSignedIn ? (
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
                <Link href='/dashboard'>
                    <DropdownMenuItem>
                        <Icons.dashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                    </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <Icons.logout className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button size="sm" variant="secondary" onClick={signIn}>
            Sign In
          </Button>
        )}
      </div>
    )
 }
  