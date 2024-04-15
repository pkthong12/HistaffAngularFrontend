import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportViewComponent } from "./report-view.component";
import { CoreService } from "src/app/services/core.service";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { CoreListModule } from "src/app/libraries/core-list/core-list.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LibrariesModule } from "src/app/libraries/libraries.module";
import { AppPipesModule } from "src/app/app-pipes/app-pipes.module";
import { CoreDropdownModule } from "src/app/libraries/core-dropdown/core-dropdown.module";
import { CoreDatePickerModule } from "src/app/libraries/core-date-picker/core-date-picker.module";
import { CoreMonthSelectorModule } from "src/app/libraries/core-month-selector/core-month-selector.module";
import { CoreFormControlSeekerModule } from "src/app/libraries/core-form-control-seeker/core-form-control-seeker.module";

const routes: Routes = [
  {
    path: "",
    component: ReportViewComponent,
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    LibrariesModule,
    AppPipesModule,
    CorePageHeaderModule,
    CoreOrgTreeModule,
    CoreDropdownModule,
    CoreDatePickerModule,
    CoreMonthSelectorModule,
    CoreListModule,
    CoreFormControlSeekerModule
  ],
  declarations: [
    ReportViewComponent,
  ],
  providers: [CoreService],
})
export class ReportViewModule { }
