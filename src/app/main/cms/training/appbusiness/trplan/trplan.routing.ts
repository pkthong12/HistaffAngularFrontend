import { RouterModule, Routes } from '@angular/router';
import { TrplanComponent } from './trplan.component';
import { NgModule } from '@angular/core';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { TrplanEditComponent } from './trplan-edit/trplan-edit.component';

const routes: Routes = [
  {
    path: '',
    component: TrplanComponent,
    children: [
      {
        path: ':id',
        component: TrplanEditComponent,
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
export class TrPlanRoutingModule {}
