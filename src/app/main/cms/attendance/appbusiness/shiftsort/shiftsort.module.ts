import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ShiftSortComponent } from "./shiftsort.component";
import { CoreService } from "src/app/services/core.service";
import { TlaSharedModule } from "src/app/components/shared.module";
import { LibrariesModule } from "src/app/libraries/libraries.module";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from "src/app/libraries/core-page-edit/core-page-edit.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { CoreCompositionModule } from "src/app/libraries/core-composition/core-composition.module";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { ExcelExportService } from "@syncfusion/ej2-angular-grids";
import { ShiftSortRoutingModule } from "./shiftsort-routing.module";
import { CoreTableModule } from "src/app/libraries/core-table/core-table.module";

import { CoreDropdownModule } from "src/app/libraries/core-dropdown/core-dropdown.module";
import { ShiftSortEditComponent } from "./edit/shiftsort-edit.component";
import { ShiftSortDeleteComponent } from "./delete/shiftsort-delete.component";
import { CoreFormModule } from "src/app/libraries/core-form/core-form.module";
import { FormsModule } from "@angular/forms";
import { CoreButtonGroupVnsModule } from "src/app/libraries/core-button-group-vns/core-button-group-vns.module";
import { CorePaginationFullModule } from "src/app/libraries/core-pagination-full/core-pagination-full.module";
import { CommonModule } from "@angular/common";
import { AppPipesModule } from "src/app/app-pipes/app-pipes.module";
import { FullscreenModalLoaderModule } from 'src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';

@NgModule({
  imports: [
    CommonModule,
    TlaSharedModule,
    LibrariesModule,
    CoreTableModule,
    CorePageListModule,
    AppPipesModule,
    CorePageEditModule,
    ShiftSortRoutingModule,
    CorePageHeaderModule,
    CoreCompositionModule,
    CoreOrgTreeModule,
    CoreDropdownModule,
    CoreFormModule,
    FormsModule,
    CoreButtonGroupVnsModule,
    CorePaginationFullModule,
    FullscreenModalLoaderModule
  ],
  declarations: [ShiftSortComponent, ShiftSortEditComponent, ShiftSortDeleteComponent],
})
export class ShiftSortModule {}
