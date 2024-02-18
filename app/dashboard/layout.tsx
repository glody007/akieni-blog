import { DashboardNav } from "@/components/dashboard/nav";
import { dashboardConfig } from "@/config/dashboard";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen lg:grid lg:grid-cols-[240px_1fr] gap-4 p-4">
      <aside className="sticky top-0 lg:top-4 md:h-full">
        <DashboardNav 
          items={dashboardConfig.nav} 
          className="lg:h-full"
        />
      </aside>
      <main className="">
        {children}
      </main>
    </div>
  );
}
