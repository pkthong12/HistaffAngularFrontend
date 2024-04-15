import { Routes } from "@angular/router";

export const OrganizeDashboardDetailRoutes: Routes = [
  {
    path: "dashboardposition",
    loadChildren: () => import("./dashboardposition/dashboardposition.module").then(m => m.DashboardPositionModule),
  },
  {
    path: "",
    redirectTo: "/cms/organize/dashboarddetail/dashboardposition",
    pathMatch: "full",
  },
];
