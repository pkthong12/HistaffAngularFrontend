import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { WelfareMngComponent } from './welfaremng.component';
import { WelfareMngEditComponent } from './edit/welfaremng-edit.component';
import { WelfaremngImportComponent } from '../welfaremng-import/welfaremng-import.component';

const routes: Routes = [
  {
    path: "",
    component: WelfareMngComponent,
    children: [
      {
        path: "welfaremng-import",
        outlet: "corePageListAux",
        component: WelfaremngImportComponent
      },
      {
        path: ":id",
        component: WelfareMngEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelfareMngRoutingModule { }