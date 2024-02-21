import { DashboardNav } from "@/components/dashboard/nav";
import { dashboardConfig } from "@/config/dashboard";
import { getUserAndCreateIfHeNotExist } from "@/lib/utilsServer";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
}>) {
  const user = await getUserAndCreateIfHeNotExist()

  if(!user) redirect('/not-author')

  if(!user.author) redirect('/not-author')

  return (
    <div className="relative h-screen lg:grid lg:grid-cols-[240px_1fr] gap-4 p-4 bg-gradient-to-b from-yellow-100/15 to-background">
      <aside className="sticky top-0 lg:top-4 lg:h-full">
        <DashboardNav 
          items={dashboardConfig.nav} 
          className="lg:h-full"
        />
      </aside>
      <main className="h-full overflow-y-scroll">
        {children}
      </main>
    </div>
  );
}
