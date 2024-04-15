import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SysFunctionActionEditComponent } from './sys-function-action-edit/sys-function-action-edit.component';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { SysFunctionActionComponent } from './sys-function-action/sys-function-action.component';

const routes: Routes = [
  {
    path: "",
    component: SysFunctionActionComponent,
    children: [
      {
        path: ":id",
        component: SysFunctionActionEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysFunctionActionRoutingModule { }
