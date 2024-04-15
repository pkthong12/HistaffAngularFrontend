import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";
import { ChangeInfoComponent } from "./change-info.component";

const routes: Routes = [
    {
      path: "",
      component: ChangeInfoComponent,
      canDeactivate: [CanDeactivateGuard],
    },
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ChangeInfoRoutingModule { }