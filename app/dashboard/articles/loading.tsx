
import { DashboardShell } from "@/components/dashboard/shell";
import { CardSkeleton, DetailSkeleton } from "@/components/skeletons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
    
export default async function DashboardArticlesLoading() {
    return (
      <DashboardShell 
        title="Articles" 
        action={(
            <Skeleton />
        )}
        className="h-full pt-4"
    >
        <div className="w-full flex items-center gap-2 md:w-[300px]">
            <Skeleton />
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div>
              <CardSkeleton />
            </div>
            <div>
              <CardSkeleton />
            </div>
            <div>
              <CardSkeleton />
            </div>
            <div>
              <CardSkeleton />
            </div>
          </div>
          <CardSkeleton />
        </div>
        <div className="flex w-full justify-center">
            <Skeleton />
        </div>
      </DashboardShell>
    );
  }
