import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { SubscribeForm } from "./subscribe-form"

interface FooterProps extends React.HTMLAttributes<HTMLHeadingElement> {
    
}

export function Footer({ className }: FooterProps) {
    return (
        <footer className={cn("flex flex-col p-4", className)}>
            <div className="flex flex-col gap-8 md:grid md:grid-cols-3 lg:grid-cols-5">
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
                        <SectionItem href="https://www.linkedin.com/company/akieni">Linkedin</SectionItem>
                        <SectionItem href="https://www.facebook.com/akieniofficiel/">Facebook</SectionItem>
                        <SectionItem href="https://www.instagram.com/akieniofficiel/">Instagram</SectionItem>
                        <SectionItem href="https://www.youtube.com/@akieniofficiel">Youtube</SectionItem>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <SectionHeader>Resources</SectionHeader>
                    <div className="flex flex-col gap-2">
                        <SectionItem href="https://documents1.worldbank.org/curated/en/668111530296585544/pdf/126034-PPAR-P108368-P117652-P165413-P165415-PUBLIC.pdf">Connectivity</SectionItem>
                        <SectionItem href="https://www.worldbank.org/en/news/press-release/2022/12/16/the-republic-of-congo-undertakes-reforms-to-promote-governance-inclusive-and-sustainable-growth-with-world-bank-support">Actualities</SectionItem>
                        <SectionItem href="https://au.int/en/documents/20200518/digital-transformation-strategy-africa-2020-2030">Strategies</SectionItem>
                    </div>
                </div>
                <div className="flex md:col-span-2">
                    <SubscribeForm />
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