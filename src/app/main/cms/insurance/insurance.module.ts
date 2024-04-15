import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { InsuranceRoutes } from "./insurance.routing";
import { Error404Module } from "../../errors/404/error-404.module";

@NgModule({
  imports: [RouterModule.forChild(InsuranceRoutes), Error404Module],
})
export class InsuranceModule {}
