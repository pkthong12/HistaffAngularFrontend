import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { SetupTimeEmpComponent } from './setuptimeemp.component';
import { SetupTimeEmpEditComponent } from './edit/setuptimeemp-edit.component';

const routes: Routes = [
  {
    path: "",
    component: SetupTimeEmpComponent,
    children: [
      {
        path: ":id",
        component: SetupTimeEmpEditComponent,
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
export class SetupTimeEmpRoutingModule { }