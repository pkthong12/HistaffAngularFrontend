import { RouterModule, Routes } from '@angular/router';
import { InsWherehealthComponent } from './ins-wherehealth.component';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { NgModule } from '@angular/core';
import { InsWherehealthEditComponent } from './ins-wherehealth-edit/ins-wherehealth-edit.component';

const routes: Routes = [
  {
    path: '',
    component: InsWherehealthComponent,
    children: [
      {
        path: ':id',
        component: InsWherehealthEditComponent,
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
export class InsWhereHealThRoutingModule {}
