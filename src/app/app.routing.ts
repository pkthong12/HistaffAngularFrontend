import { Routes } from "@angular/router";

import { Error404Component } from "./main/errors/404/error-404.component";
import { HomeComponent } from "./home/home.component";

import { InitializationCanActivateFn, InitializationCanMatchFn } from "./guards/initialization.guard";
import { OnlineUsersComponent } from "./online-users/online-users/online-users.component";

export const AppRoutes: Routes = [
  {
    path: "root",
    loadChildren: () => import('./main/root/root.module').then(m => m.RootModule),
  },
  {
    path: 'developer-doc',
    loadChildren: () => import("./documentation/documentation.module").then(m => m.DocumentationModule)
  },
  {
    path: 'online-users',
    component: OnlineUsersComponent,
    outlet: 'popupAux2'
  },
  {
    path: 'menu',
    loadChildren: () => import("./menu/menu.module").then(m => m.MenuModule)
  },
  {
    path: 'home',
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
  },
  {
    path: "auth",
    children: [
      {
        path: "",
        loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
      },
    ],
  },
  {
    path: "sys",
    children: [
      {
        path: "",
        loadChildren: () => import("./main/system/system.module").then(m => m.SystemModule),
      },
    ],
    //canActivate: [AdminGuard],
  },
  {
    path: "cms",
    children: [
      {
        path: "",
        loadChildren: () => import("./main/cms/cms.module").then(m => m.CmsModule),
      },
    ],
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "**",
    component: Error404Component,
  },
];
