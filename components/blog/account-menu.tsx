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
  
export function AccountMenu() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer" asChild>
            <Avatar>
                <AvatarImage src="https://avatars.githubusercontent.com/u/25279896?v=4" alt="@techalchemist" />
                <AvatarFallback>AL</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-4">
          <DropdownMenuLabel className="font-light mb-2">techalchemist@gmail.com</DropdownMenuLabel>
          <DropdownMenuGroup>
            <Link href='/dashboard'>
                <DropdownMenuItem>
                    <Icons.dashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Icons.logout className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
 }
  