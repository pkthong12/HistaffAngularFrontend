import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { PositionComponent } from "./position.component";
import { PositionEditComponent } from "./edit/position-edit.component";

import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { CoreService } from "src/app/services/core.service";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { CoreCheckboxModule } from "src/app/libraries/core-checkbox/core-checkbox.module";
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";
import { PositionRoutingModule } from "./position-routing.module";
import { ExcelExportService } from "@syncfusion/ej2-angular-grids";
import { CoreStatusStickerModule } from "src/app/libraries/core-status-sticker/core-status-sticker.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccordionModule, 
    LibrariesModule,
    CorePageListModule,
    CoreOrgTreeModule,
    CorePageEditModule,
    CorePageHeaderModule,
    CoreCheckboxModule,
    PositionRoutingModule,
    CoreStatusStickerModule
  ],
  declarations: [PositionComponent, PositionEditComponent],
  providers: [CoreService, ExcelExportService],
})
export class PositionModule { }
