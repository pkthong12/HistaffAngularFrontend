import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkingBeforeComponent } from './working-before/working-before.component';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { WorkingBeforeEditComponent } from './working-before-edit/working-before-edit.component';
import { HuWorkingBeforeImportComponent } from '../hu-working-before-import/hu-working-before-import.component';

const routes: Routes = [
  {
    path: "",
    component: WorkingBeforeComponent,
    children: [
      {
        path: "hu-working-before-import",
        outlet: "corePageListAux",
        component: HuWorkingBeforeImportComponent
      },
      {
        path: ":id",
        component: WorkingBeforeEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkingBeforeRoutingModule { }
