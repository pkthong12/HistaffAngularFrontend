import { Routes } from "@angular/router";
import { Error404Component } from "../../errors/404/error-404.component";

export const MediaRoutes: Routes = [
  {
    path: "",
    redirectTo: "./survey/survey.module#SurveyModule",
    pathMatch: "full",
  },
  {
    path: "survey",
    //loadChildren: "./survey/survey.module#SurveyModule",
    loadChildren: () => import("./survey/survey.module").then(m => m.SurveyModule),
  },
  {
    path: "internalblog",
    //loadChildren: "./internalblog/internalblog.module#InternalBlogModule",
    loadChildren: () => import("./internalblog/internalblog.module").then(m => m.InternalBlogModule),
  },
  {
    path: "**",
    component: Error404Component,
  },
];
