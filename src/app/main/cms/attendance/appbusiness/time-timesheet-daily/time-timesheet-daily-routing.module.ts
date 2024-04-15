import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { TimeTimesheetDailyComponent } from "./time-timesheet-daily.component";
import { TimeTimesheetDailylEditComponent } from './edit/time-timesheet-daily-edit.component';

const routes: Routes = [
  {
    path: "",
    component: TimeTimesheetDailyComponent,
    children: [
      {
        path: ":id",
        component: TimeTimesheetDailylEditComponent,
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
export class TimeTimesheetDailyRoutingModule { }