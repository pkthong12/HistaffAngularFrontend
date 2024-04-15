import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FunctionIgnoreComponent } from './function-ignore/function-ignore.component';
import { FunctionIgnoreEditComponent } from './function-ignore-edit/function-ignore-edit.component';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: "",
    component: FunctionIgnoreComponent,
    children: [
      {
        path: ":id",
        component: FunctionIgnoreEditComponent,
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
export class FunctionIgnoreRoutingModule { }
