
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayrollFormulaEditComponent } from "./edit/payrollformula-edit.component";
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { PayrollFormulaComponent } from './payrollformula.component';

const routes: Routes = [
  {
    path: "",
    component: PayrollFormulaComponent,
  },
  {
    path: ":id",
    component: PayrollFormulaEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PayrollFormulaRoutingModule { }