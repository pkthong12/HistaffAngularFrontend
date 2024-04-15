import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ReportChartComponent } from "./reportchart.component";
import { CoreService } from "src/app/services/core.service";
import { TlaSharedModule } from "src/app/components/shared.module";
import { ExcelExportService } from "@syncfusion/ej2-angular-grids";
import { ReportProfileComponent } from "./reportprofile/reportprofile.component";
import { ReportSalaryComponent } from "./reportsalary/reportsalary.component";

const routes: Routes = [
  {
    path: "",
    component: ReportChartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TlaSharedModule],
  declarations: [
    ReportChartComponent,
    ReportProfileComponent,
    ReportSalaryComponent
  ],
  providers: [CoreService, ExcelExportService],
})
export class ReportChartModule {}
