import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { PeriodTaxEditComponent } from './edit/periodtax-edit.component';
import { PeriodTaxComponent } from './periodtax.component';

const routes: Routes = [
  {
    path: "",
    component: PeriodTaxComponent,
    children: [
      {
        path: ":id",
        component: PeriodTaxEditComponent,
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
export class PeriodTaxRoutingModule { }