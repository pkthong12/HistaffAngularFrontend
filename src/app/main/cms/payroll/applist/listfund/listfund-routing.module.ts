import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { ListfundEditComponent } from './edit/listfund-edit.component';
import { ListfundCompnent } from './listfund.component';

const routes: Routes = [
  {
    path: "",
    component: ListfundCompnent,
    children: [
      {
        path: ":id",
        component: ListfundEditComponent,
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
export class ListfundRoutingModule { }