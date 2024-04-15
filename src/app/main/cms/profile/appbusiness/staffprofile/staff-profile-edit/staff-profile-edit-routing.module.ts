import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";
import { StaffProfileEditComponent } from "./staff-profile-edit.component";

const routes: Routes = [
    {
      path: "",
      component: StaffProfileEditComponent,
      canDeactivate: [CanDeactivateGuard],
    },
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class StaffProfileEditRoutingModule { }