import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes } from "react";
import { Icons } from "../icons";

interface OverviewCardProps extends HtmlHTMLAttributes<HTMLElement> {
    title: string
    description: string
    icon: keyof typeof Icons
}

export function OverviewCard({ title, description, icon, className }: OverviewCardProps) {
    const Icon = Icons[icon]
    return (
        <Card className={cn("gap-0", className)}>
            <CardContent className="flex flex-col gap-2 pt-6">
                <div className="flex flex-row justify-between gap-4">
                    <p className="text-sm">{title}</p>
                    <Icon className="w-4 h-4" />
                </div>
                <div >
                    <CardTitle className="text-2xl">{description}</CardTitle>
                    <p className="text-xs text text-muted-foreground">Since the beginning</p>
                </div>
            </CardContent>
        </Card>
    )
}