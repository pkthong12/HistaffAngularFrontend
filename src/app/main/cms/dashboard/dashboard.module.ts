import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";
import { AppDashboardComponent } from "./dashboard.component";

// import { CoreService } from "src/app/services/core.service";

// High chart
import { ChartModule } from "angular-highcharts";
import { Ng5SliderModule } from "ng5-slider";
import { HighchartsChartModule } from "highcharts-angular";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { GenderChartComponent } from './components/gender-chart/gender-chart.component';
import { ContractChartComponent } from './components/contract-chart/contract-chart.component';
import { LearnningChartComponent } from './components/learnning-chart/learnning-chart.component';
import { EmpMonthChartComponent } from './components/emp-month-chart/emp-month-chart.component';
import { SeniorityChartComponent } from './components/seniority-chart/seniority-chart.component';
import { GeneralOverviewComponent } from './components/general-overview/general-overview.component';
import { AppPipesModule } from "src/app/app-pipes/app-pipes.module";
import { NewEmpMonthChartComponent } from "./components/new-emp-month-chart/new-emp-month-chart.component";
import { CoreFormControlSeekerModule } from "src/app/libraries/core-form-control-seeker/core-form-control-seeker.module";
import { CustomPrintChartComponent } from './components/custom-print-chart/custom-print-chart.component';
import { CustomSeekerOrgComponent } from './components/custom-seeker-org/custom-seeker-org.component';
import { TooltipModule } from "src/app/libraries/tooltip/tooltip.module";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: AppDashboardComponent
  },
  {
    path: "test",
    component: CustomPrintChartComponent
  }
];
const menuPrint = [
  {
    translateCode: 'Download PNG image',// EnumTranslateKey.UI_AUTH_PROFILE_MENU_SEE_PROFILE,
    fileData: 'png',
  },
  {
    translateCode: 'Download JPEG image',// EnumTranslateKey.UI_AUTH_PROFILE_MENU_CHANGE_PASSWORD,
    fileData: 'jpeg',
  },
  {
    translateCode: 'Download PDF document',// EnumTranslateKey.UI_AUTH_PROFILE_MENU_CHANGE_PASSWORD,
    fileData: 'pdf',
  },
  {
    translateCode: 'Download SVG vector image',// EnumTranslateKey.UI_AUTH_PROFILE_MENU_CHANGE_PASSWORD,
    fileData: 'svg',
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    //TlaSharedModule,
    // HighChart
    ChartModule,
    // Slider
    Ng5SliderModule,
    CorePageHeaderModule,
    AppPipesModule,
    CoreFormControlSeekerModule,
    TooltipModule,
    CoreOrgTreeModule,

  ],
  declarations: [
    CustomPrintChartComponent,
    AppDashboardComponent,
    GenderChartComponent,
    ContractChartComponent,
    LearnningChartComponent,
    EmpMonthChartComponent,
    NewEmpMonthChartComponent,
    SeniorityChartComponent,
    GeneralOverviewComponent,
    CustomSeekerOrgComponent,
  ],
  exports: [
    AppDashboardComponent,
  ],
  // providers: [CoreService]
})
export class AppDashboardModule { }
