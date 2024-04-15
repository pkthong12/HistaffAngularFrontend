import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupPositionComponent } from "./groupposition.component";
import { GroupPositionEditComponent } from "./edit/groupposition-edit.component";
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: "",
    component: GroupPositionComponent,
    children: [
      {
        path: ":id",
        component: GroupPositionEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupPositionRoutingModule { }