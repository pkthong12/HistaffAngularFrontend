import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { UserPermissionComponent } from "./userpermission.component";

import { CorePermissionModule } from "src/app/libraries/core-permission/core-permission.module";
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";

const routes: Routes = [
  {
    path: ":id",
    component: UserPermissionComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: "",
    redirectTo: "0",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CorePermissionModule
  ],
  declarations: [UserPermissionComponent],
})
export class UserPermissionModule {}
