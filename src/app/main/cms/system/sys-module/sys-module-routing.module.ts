import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SysModuleComponent } from './sys-module/sys-module.component';
import { SysModuleEditComponent } from './sys-module-edit/sys-module-edit.component';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: "",
    component: SysModuleComponent,
    children: [
      {
        path: ":id",
        component: SysModuleEditComponent,
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
export class SysModuleRoutingModule { }
