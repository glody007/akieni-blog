import { Metadata } from "next"
import { OverviewCard } from "@/components/dashboard/overview-card";
import { DashboardShell } from "@/components/dashboard/shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeSpent } from "@/components/dashboard/time-spent";
import { Suspense } from "react";
import { AuthorList } from "@/components/dashboard/author-list";
import { getMetrics } from "@/lib/utilsServer";
import { DetailSkeleton } from "@/components/skeletons";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Analytics of the blog",
}

export default async function DashboardPage() {
    const metrics = await getMetrics()
    
    return (
      <DashboardShell title="Dashboard" className="h-full pt-4">
        <div className="h-full grid md:grid-cols-[1fr_300px] gap-4">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <div>
                <OverviewCard 
                  title="Active users" 
                  description={metrics.users.toString()}
                  icon="user" 
                />
              </div>
              <div>
                <OverviewCard 
                  title="Articles" 
                  description={metrics.articles.toString()} 
                  icon="file" 
                />
              </div>
              <div>
                <OverviewCard 
                  title="Likes" 
                  description={metrics.likes.toString()} 
                  icon="heart" 
                />
              </div>
              <div>
                <OverviewCard 
                  title="Comments" 
                  description={metrics.comments.toString()} 
                  icon="message" 
                />
              </div>
            </div>
            <Card className="xl:flex-1">
              <CardHeader>
                <CardTitle>
                  Time spent by users
                </CardTitle>
                <CardDescription>
                  How many times user spent reading articles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TimeSpent />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Authors</CardTitle>
              <CardDescription>Authors details</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={(<DetailSkeleton />)}>
                <AuthorList />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    );
  }