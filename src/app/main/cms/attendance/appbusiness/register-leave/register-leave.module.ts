import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RegisterLeaveComponent } from "./register-leave.component";
import { CoreService } from "src/app/services/core.service";
import { LeaveEditComponent } from "./leave-edit/leave-edit.component";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { TlaSharedModule } from "src/app/components/shared.module";
import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { CoreDropdownModule } from "src/app/libraries/core-dropdown/core-dropdown.module";
import { CoreDatePickerModule } from "src/app/libraries/core-date-picker/core-date-picker.module";
import { CoreButtonGroupVnsModule } from "src/app/libraries/core-button-group-vns/core-button-group-vns.module";

const routes: Routes = [
  {
    path: "",
    component: RegisterLeaveComponent
  },
  {
    path: ":id",
    component: LeaveEditComponent,
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
    CoreButtonGroupVnsModule],
  declarations: [RegisterLeaveComponent, LeaveEditComponent],
  providers: [CoreService],
})
export class RegisterleaveModule {}
