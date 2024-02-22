
import { DashboardShell } from "@/components/dashboard/shell";
import { CardSkeleton, DetailSkeleton } from "@/components/skeletons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
    
export default async function DashboardNewsletterLoading() {
    return (
      <DashboardShell 
        title="Subscriptions" 
        className="grid grid-cols-1  pt-4"
    >
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </DashboardShell>
    );
  }
