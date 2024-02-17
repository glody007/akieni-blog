import { OverviewCard } from "@/components/dashboard/overview-card";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
    return (
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
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Activity tracking</CardTitle>
            <CardDescription>Likes, Comments, Users</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }