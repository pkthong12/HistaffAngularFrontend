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
import { SignDefaultRoutingModule } from "./signdefault-routing.module";
import { SignDefaultComponent } from "./signdefault.component";
import { SignDefaultEditComponent } from "./edit/signdefault-edit.component";
import { CoreStatusStickerModule } from "src/app/libraries/core-status-sticker/core-status-sticker.module";
import { SigndefaultImportComponent } from './signdefault-import/signdefault-import.component';
import { CoreButtonGroupVnsModule } from "src/app/libraries/core-button-group-vns/core-button-group-vns.module";
import { AppPipesModule } from "src/app/app-pipes/app-pipes.module";
import { FullscreenModalLoaderModule } from "src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module";


@NgModule({
  imports: [
    TlaSharedModule,
    AccordionModule,
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
    SignDefaultRoutingModule,
    CorePageHeaderModule,
    CoreCompositionModule,
    CoreOrgTreeModule,
    CoreStatusStickerModule,
    CoreButtonGroupVnsModule,
    AppPipesModule,
    FullscreenModalLoaderModule,
  ],
  declarations: [SignDefaultComponent, SignDefaultEditComponent, SigndefaultImportComponent],
  providers: [CoreService],
})
export class SignDefaultModule {}
