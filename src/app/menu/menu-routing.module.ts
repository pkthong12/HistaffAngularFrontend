import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';
import { CanDeactivateGuard } from '../guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: ":id",
        component: MenuEditComponent,
        outlet: "menuAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
