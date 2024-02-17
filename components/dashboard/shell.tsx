import { cn } from "@/lib/utils"
import { HtmlHTMLAttributes } from "react"

interface DashboardShellProps extends HtmlHTMLAttributes<HTMLElement> {
    title: string
    action?: React.ReactNode
}

export function DashboardShell({ title, action, children, className }: DashboardShellProps) {
    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <div className="flex justify-between">
                <div className="text-4xl font-extrabold">{title}</div>
                <div>{action}</div>
            </div>
            {children}
        </div>
    )
}