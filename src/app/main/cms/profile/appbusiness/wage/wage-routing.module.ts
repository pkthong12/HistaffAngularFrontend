import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { WageComponent } from './wage.component';
import { WageEditComponent } from './edit/wage-edit.component';
import { HuWorkingHslPcImportComponent } from './hu-working-hsl-pc-import/hu-working-hsl-pc-import.component';

const routes: Routes = [
  {
    path: "",
    component: WageComponent,
    children: [
      {
        path: "hu-working-hsl-pc-import",
        outlet: "corePageListAux",
        component: HuWorkingHslPcImportComponent
      }
    ]
  },
  {
    path: ":id",
    component: WageEditComponent,
    canDeactivate: [CanDeactivateGuard]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WageRoutingModule { }