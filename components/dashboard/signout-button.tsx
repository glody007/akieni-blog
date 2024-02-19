"use client"

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useAuth } from "@clerk/nextjs";

export function SignOutButton() {
    const { signOut } = useAuth()

    return (
        <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => signOut()}
        >
            <Icons.logout className="w-4 h-4 mr-2" />
            Logout
        </Button>
    )
}