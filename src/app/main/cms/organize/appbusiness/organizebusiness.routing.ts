import { Routes } from "@angular/router";

export const OrganizeBusinessRoutes: Routes = [
  {
    path: "organization-struct",
    loadChildren: () => import("./organization-struct/organization-struct.module").then(m => m.OrganizationStructModule),
  },
  {
    path: "organization-level",
    loadChildren: () => import("./organization-level/organization-level.module").then(m => m.OrganizationLevelModule),
  },
  {
    path: "plan",
    loadChildren: () => import("./plan/plan.module").then(m => m.PlanModule),
  },
];
