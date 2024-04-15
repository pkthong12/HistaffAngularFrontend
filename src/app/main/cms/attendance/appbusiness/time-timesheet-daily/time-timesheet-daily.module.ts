import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CoreService } from "src/app/services/core.service";
import { TlaSharedModule } from "src/app/components/shared.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from "src/app/libraries/core-page-edit/core-page-edit.module";
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { CoreCompositionModule } from "src/app/libraries/core-composition/core-composition.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { ExcelExportService } from "@syncfusion/ej2-angular-grids";
import { TimeTimesheetDailyRoutingModule } from "./time-timesheet-daily-routing.module";
import { TimeTimesheetDailyComponent } from "./time-timesheet-daily.component";
import { CoreDropdownModule } from "src/app/libraries/core-dropdown/core-dropdown.module";
import { CoreButtonGroupVnsModule } from "src/app/libraries/core-button-group-vns/core-button-group-vns.module";
import { CoreDatePickerModule } from "src/app/libraries/core-date-picker/core-date-picker.module";
import { CoreFormControlSeekerModule } from "src/app/libraries/core-form-control-seeker/core-form-control-seeker.module";
import { CoreChecklistModule } from "src/app/libraries/core-checklist/core-checklist.module";
import { AppPipesModule } from "src/app/app-pipes/app-pipes.module";
import { FullscreenModalLoaderModule } from "src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module";
import { TimeTimesheetDailylEditComponent } from "./edit/time-timesheet-daily-edit.component";
import { PipesModule } from "src/app/libraries/pipes/pipes.module";
import { CoreCheckboxModule } from 'src/app/libraries/core-checkbox/core-checkbox.module';

@NgModule({
  imports: [
    CommonModule,
    TlaSharedModule,
    LibrariesModule,
    AppPipesModule,
    CorePageListModule,
    CorePageEditModule,
    TimeTimesheetDailyRoutingModule,
    CorePageHeaderModule,
    CoreCompositionModule,
    CoreOrgTreeModule,
    CoreDropdownModule,
    CoreButtonGroupVnsModule,
    CoreDatePickerModule,
    CoreFormControlSeekerModule,
    CoreChecklistModule,
    FullscreenModalLoaderModule,
    PipesModule,
    CoreCheckboxModule
  ],
  declarations: [TimeTimesheetDailyComponent, TimeTimesheetDailylEditComponent],
  providers: [CoreService],
})
export class TimeTimesheetDailyModule {}
