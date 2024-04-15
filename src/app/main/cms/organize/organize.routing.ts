import{Routes} from "@angular/router";
import { Error404Component } from "../../errors/404/error-404.component";

export const OrganizeRoutes: Routes = [
  {
    path: "list",
    loadChildren: () => import("./applist/organizelist.module").then(m => m.OrganizeListModule),
  },
  {
    path: "business",
    loadChildren: () => import("./appbusiness/organizebusiness.module").then(m => m.OrganizeBusinessModule),
  },
  {
    path: "report",
    loadChildren: () => import("./appreport/organizereport.module").then(m => m.OrganizeReportModule),
  },
  {
    path: "dashboarddetail",
    loadChildren: () => import("./appdashboarddetail/organizedashboarddetail.module").then(m => m.OrganizeDashboardDetailModule),
  },
  {
    path: "orgchart-tree",
    loadChildren: () => import("./orgchart/orgchart.module").then(m => m.OrgchartModule)
  },
  {
    path: "",
    redirectTo: "/cms/organize/dashboarddetail",
    pathMatch: "full",
  },
  {
    path: "**",
    component: Error404Component,
  },
];