import { Icons } from "@/components/icons"

export type SiteConfig = {
    name: string
    description: string
}

export type NavItem = {
    name: string
    href: string
    icon: keyof typeof Icons
}

export type DashboardConfig = {
    nav: NavItem[]
}
 