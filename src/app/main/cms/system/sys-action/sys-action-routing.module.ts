import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SysActionComponent } from './sys-action/sys-action.component';
import { SysActionEditComponent } from './sys-action-edit/sys-action-edit.component';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: "",
    component: SysActionComponent,
    children: [
      {
        path: ":id",
        component: SysActionEditComponent,
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
export class SysActionRoutingModule { }
