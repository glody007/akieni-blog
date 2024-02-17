import { DashboardNav } from "@/components/dashboard/nav";
import { dashboardConfig } from "@/config/dashboard";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen grid md:grid-cols-[240px_1fr] gap-4 p-4">
      <aside className="h-full">
        <DashboardNav 
          items={dashboardConfig.nav} 
          className="h-full"
        />
      </aside>
      <main className="">
        {children}
      </main>
    </div>
  );
}
