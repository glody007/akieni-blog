import { DashboardShell } from "@/components/dashboard/shell";
import { getNewsletterSubscriptions } from "@/lib/utilsServer";
import { format } from "date-fns";

export default async function NewsletterPage() {
    const subscriptions = await getNewsletterSubscriptions()

    return (
        <DashboardShell 
            title="Subscriptions" 
            className="h-full pt-4"
        >
            <div className="flex flex-col">
                {subscriptions.map((sub) => (
                    <div key={sub.id} className="w-full flex flex-col justify-between lg:items-center lg:flex-row border p-4 bg-background">
                        <p className="text-sm first-letter:uppercase">{sub.email}</p>
                        <p className="text-sm text-muted-foreground">{format(sub.createdAt, "MMM io yyyy HH:mm")}</p>
                    </div>
                ))}
            </div>
        </DashboardShell>
    )
}