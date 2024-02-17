import { DashboardNav } from "@/components/dashboard/nav";
import { dashboardConfig } from "@/config/dashboard";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen grid md:grid-cols-[260px_1fr]">
      <aside className="h-full p-4">
        <DashboardNav 
          items={dashboardConfig.nav} 
          className="h-full shadow-lg"
        />
      </aside>
      <main>
        {children}
      </main>
    </div>
  );
}
