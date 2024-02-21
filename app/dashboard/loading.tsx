
import { DashboardShell } from "@/components/dashboard/shell";
import { CardSkeleton, DetailSkeleton } from "@/components/skeletons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
    
export default async function DashboardLoading() {
    return (
      <DashboardShell title="Dashboard" className="h-full pt-4">
        <div className="h-full grid md:grid-cols-[1fr_300px] gap-4">
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
          <Card>
            <CardHeader>
              <CardTitle>Authors</CardTitle>
              <CardDescription>Authors details</CardDescription>
            </CardHeader>
            <CardContent>
              <DetailSkeleton />
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    );
  }
