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
import { WelfareMngComponent } from "./welfaremng.component";
import { WelfareMngEditComponent } from "./edit/welfaremng-edit.component";
import { WelfareMngRoutingModule } from "./welfaremng-routing.module";
import { CoreCompositionModule } from "src/app/libraries/core-composition/core-composition.module";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { ExcelExportService } from "@syncfusion/ej2-angular-grids";
import { WelfaremngImportComponent } from "../welfaremng-import/welfaremng-import.component";
import { FullscreenModalLoaderModule } from "src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module";
import { CoreButtonGroupVnsModule } from "src/app/libraries/core-button-group-vns/core-button-group-vns.module";
import { AppPipesModule } from "src/app/app-pipes/app-pipes.module";

@NgModule({
  imports: [
    TlaSharedModule,
    AccordionModule,
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
    WelfareMngRoutingModule,
    CorePageHeaderModule,
    CoreCompositionModule,
    CoreOrgTreeModule,
    FullscreenModalLoaderModule,
    CoreButtonGroupVnsModule,
    AppPipesModule,
  ],
  declarations: [WelfareMngComponent, WelfareMngEditComponent, WelfaremngImportComponent],
  providers: [CoreService, ExcelExportService],
})
export class WelfareMngModule {}
