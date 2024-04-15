import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeImportComponent } from './time-import.component';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';
import { CorePageListComponent } from 'src/app/libraries/core-page-list/core-page-list.component';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { CoreDropdownModule } from 'src/app/libraries/core-dropdown/core-dropdown.module';
import { CoreFormControlSeekerModule } from 'src/app/libraries/core-form-control-seeker/core-form-control-seeker.module';
import { CoreButtonGroupVnsModule } from 'src/app/libraries/core-button-group-vns/core-button-group-vns.module';
import { CoreChecklistModule } from 'src/app/libraries/core-checklist/core-checklist.module';
import { CoreDatePickerModule } from 'src/app/libraries/core-date-picker/core-date-picker.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CoreTableModule } from 'src/app/libraries/core-table/core-table.module';
import { CoreCompositionModule } from 'src/app/libraries/core-composition/core-composition.module';
import { CoreControlModule } from 'src/app/libraries/core-control/core-control.module';
import { TimeImportEditComponent } from './time-import-edit/time-import-edit.component';
import { RouterModule, Routes } from "@angular/router";
import { CoreService } from "src/app/services/core.service";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CorePaginationFullModule } from "src/app/libraries/core-pagination-full/core-pagination-full.module";
import { FullscreenModalLoaderModule } from 'src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';


const routes: Routes = [
  {
    path: "",
    component: TimeImportComponent,
  },
  {
    path: ":id",
    component: TimeImportEditComponent,
  }
];
@NgModule({
  declarations: [
    TimeImportComponent,
    TimeImportEditComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TlaSharedModule,
    LibrariesModule,
    CoreOrgTreeModule,
    AppPipesModule,
    CorePageListModule,
    CoreDropdownModule,
    CoreFormControlSeekerModule,
    CoreButtonGroupVnsModule,
    CoreChecklistModule,
    CoreDatePickerModule,
    CorePageHeaderModule,
    CoreTableModule,
    CoreCompositionModule,
    CoreControlModule,
    RouterModule,
    CorePageEditModule,
    CorePaginationFullModule,
    FullscreenModalLoaderModule
  ],
  providers: [CoreService],
})
export class TimeImportModule { }
