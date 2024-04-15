import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LibrariesModule } from "src/app/libraries/libraries.module";

import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";

import { LeaveJobComponent } from "./leavejob.component";
import { CoreService } from "src/app/services/core.service";
import { LeaveJobEditComponent } from "./edit/leavejob-edit.component";
import { TlaSharedModule } from "src/app/components/shared.module";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { ExcelExportService } from "@syncfusion/ej2-angular-grids";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { LeaveJobRoutingModule } from "./leavejob-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AppPipesModule } from "src/app/app-pipes/app-pipes.module";
import { DirectiveModule } from "src/app/directives/directive.module";
import { CoreHeaderParamsModule } from "src/app/libraries/core-header-params/core-header-params.module";
import { FullscreenModalLoaderModule } from 'src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';
import { CoreStatusStickerModule } from "src/app/libraries/core-status-sticker/core-status-sticker.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LibrariesModule,
    CorePageEditModule,
    DirectiveModule,
    AppPipesModule,
    CorePageListModule,
    LeaveJobRoutingModule,
    CoreOrgTreeModule,
    CoreHeaderParamsModule,
    FullscreenModalLoaderModule,
    CoreStatusStickerModule
  ],
  declarations: [LeaveJobComponent, LeaveJobEditComponent],
  providers: [CoreService, ExcelExportService],
})
export class LeaveJobModule {}
