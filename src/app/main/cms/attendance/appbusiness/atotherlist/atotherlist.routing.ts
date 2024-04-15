import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AtotherlistComponent } from "./atotherlist.component";
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";
import { AtotherlistEditComponent } from "./atotherlist-edit/atotherlist-edit.component";



const routes: Routes = [
  {
    path: "",
    component: AtotherlistComponent,
  },
  {
    path: ":id",
    component: AtotherlistEditComponent,
    canDeactivate: [CanDeactivateGuard]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtOtherListRoutingModule { }