import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
    nav: [
        {
            name: "Dashbord",
            href: "/dashboard",
            icon: "dashboard"
        },
        {
            name: "Articles",
            href: "/dashboard/articles",
            icon: "fileText"
        },
        {
            name: "Authors",
            href: "/dashboard/authors",
            icon: "fileText"
        },
    ]
}