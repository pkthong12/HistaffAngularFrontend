import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { InsTypeComponent } from './ins-type.component';
import { InsTypeEditComponent } from './ins-type-edit/ins-type-edit.component';

const routes: Routes = [
  {
    path: '',
    component: InsTypeComponent,
    children: [
      {
        path: ':id',
        component: InsTypeEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsTypeRoutingModule {}
