import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { DecisionComponent } from './decision.component';
import { DecisionEditComponent } from './edit/decision-edit.component';
import { DecisionImportComponent } from './decision-import/decision-import.component';

const routes: Routes = [
  {
    path: "",
    component: DecisionComponent,
    children: [
      {
        path: "decision-import",
        outlet: "corePageListAux",
        component: DecisionImportComponent,
      },
    ]
  },
  
  {
    path: ":id",
    component: DecisionEditComponent,
    canDeactivate: [CanDeactivateGuard]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecisionRoutingModule { }