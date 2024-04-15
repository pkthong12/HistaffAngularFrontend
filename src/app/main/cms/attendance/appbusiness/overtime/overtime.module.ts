import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { OvertimeComponent } from "./overtime.component";
import { CoreService } from "src/app/services/core.service";
 import { OvertimeEditComponent } from "./overtime-edit/overtime-edit.component";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { TlaSharedModule } from "src/app/components/shared.module";
import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { CoreDropdownModule } from "src/app/libraries/core-dropdown/core-dropdown.module";
import { CoreDatePickerModule } from "src/app/libraries/core-date-picker/core-date-picker.module";
import { CoreButtonGroupVnsModule } from "src/app/libraries/core-button-group-vns/core-button-group-vns.module";
import { FullscreenModalLoaderModule } from 'src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';

const routes: Routes = [
  {
    path: "",
    component: OvertimeComponent
  },
  {
    path: ":id",
    component: OvertimeEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes), TlaSharedModule, LibrariesModule,
    CoreOrgTreeModule,
    CorePageListModule,
    CorePageEditModule,
    CoreDropdownModule,
    CoreDatePickerModule,
    CoreButtonGroupVnsModule,
    FullscreenModalLoaderModule
  ],
  declarations: [OvertimeComponent, OvertimeEditComponent],
  providers: [CoreService],
})
export class OvertimeModule {}
