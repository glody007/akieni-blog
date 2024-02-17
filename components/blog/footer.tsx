import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface FooterProps extends React.HTMLAttributes<HTMLHeadingElement> {
    
}

export function Footer({ className }: FooterProps) {
    return (
        <footer className={cn("flex flex-col p-4", className)}>
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-5">
                <div className="h-full flex flex-col justify-between">
                    <div className="flex flex-col gap-4">
                        <p className="text-sm font-light text-muted-foreground">
                            {siteConfig.name} © 2024
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <SectionHeader>Follow</SectionHeader>
                    <div className="flex flex-col gap-2">
                        <SectionItem href="http://">Lorem ipsum</SectionItem>
                        <SectionItem href="http://">Lorem ipsum</SectionItem>
                        <SectionItem href="http://">Lorem ipsum</SectionItem>
                        <SectionItem href="http://">Lorem ipsum</SectionItem>
                        <SectionItem href="http://">Lorem ipsum</SectionItem>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <SectionHeader>Resources</SectionHeader>
                    <div className="flex flex-col gap-2">
                        <SectionItem href="http://">Lorem ipsum</SectionItem>
                        <SectionItem href="http://">Lorem ipsum</SectionItem>
                        <SectionItem href="http://">Lorem ipsum</SectionItem>
                        <SectionItem href="http://">Lorem ipsum</SectionItem>
                    </div>
                </div>
                <div className="flex flex-col gap-4 md:col-span-2">
                    <SectionHeader>Our hand-crafted newsletter</SectionHeader>
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <Input placeholder="Your email"/>
                        <Button>Subscribe</Button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

interface SectionHeaderProps { 
    children?: React.ReactNode
}

function SectionHeader({ children }: SectionHeaderProps) {
    return (
        <h2 className="p-0 text-sm">
            {children}
        </h2>
    )
}

interface SectionItemProps { 
    children?: React.ReactNode
    href: string
}

function SectionItem({ children, href }: SectionItemProps) {
    return (
        <Link href={href} className="font-light text-sm text-muted-foreground hover:text-foreground">
            {children}
        </Link>
    )
}