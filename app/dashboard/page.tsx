import { Metadata } from "next"
import { OverviewCard } from "@/components/dashboard/overview-card";
import { DashboardShell } from "@/components/dashboard/shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeSpent } from "@/components/dashboard/time-spent";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Analytics of the blog",
}

export default function DashboardPage() {
    return (
      <DashboardShell title="Dashboard" className="h-full pt-4">
        <div className="h-full grid md:grid-cols-[1fr_300px] gap-4">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <OverviewCard 
                  title="Users" 
                  description="450" 
                  icon="user" 
                />
              </div>
              <div>
                <OverviewCard 
                  title="Articles" 
                  description="40" 
                  icon="file" 
                />
              </div>
              <div>
                <OverviewCard 
                  title="Likes" 
                  description="60" 
                  icon="heart" 
                />
              </div>
              <div>
                <OverviewCard 
                  title="Comments" 
                  description="79" 
                  icon="message" 
                />
              </div>
            </div>
            <Card className="flex-1">
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
          </Card>
        </div>
      </DashboardShell>
    );
  }