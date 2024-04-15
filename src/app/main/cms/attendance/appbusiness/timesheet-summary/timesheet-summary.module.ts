import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TimesheetSummaryComponent } from "./timesheet-summary.component";
import { CoreService } from "src/app/services/core.service";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { TlaSharedModule } from "src/app/components/shared.module";
import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { CoreDropdownModule } from "src/app/libraries/core-dropdown/core-dropdown.module";
import { CoreButtonGroupVnsModule } from "src/app/libraries/core-button-group-vns/core-button-group-vns.module";
import { CoreFormComponent } from "src/app/libraries/core-form/core-form/core-form.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AppPipesModule } from "src/app/app-pipes/app-pipes.module";
import { DirectiveModule } from "src/app/directives/directive.module";
import { CoreHeaderParamsModule } from "src/app/libraries/core-header-params/core-header-params.module";
import { FullscreenModalLoaderModule } from "src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module";

const routes: Routes = [
  {
    path: "",
    component: TimesheetSummaryComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    LibrariesModule,
    CorePageEditModule,
    DirectiveModule,
    AppPipesModule,
    CorePageListModule,
    CoreOrgTreeModule,
    CoreHeaderParamsModule,
    FullscreenModalLoaderModule,
    CoreButtonGroupVnsModule
  ],
  declarations: [TimesheetSummaryComponent],
  providers: [CoreService],
})
export class TimesheetSummaryModule {}
