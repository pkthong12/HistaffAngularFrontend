import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DecisionComponent } from "./decision.component";
import { CoreService } from "src/app/services/core.service";
import { DecisionEditComponent } from "./edit/decision-edit.component";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { TlaSharedModule } from "src/app/components/shared.module";
import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { DecisionRoutingModule } from "./decision-routing.module";
import { DecisionImportComponent } from './decision-import/decision-import.component';
import { CoreButtonGroupVnsModule } from "src/app/libraries/core-button-group-vns/core-button-group-vns.module";
import { FullscreenModalLoaderModule } from "src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module";
import { AppPipesModule } from "src/app/app-pipes/app-pipes.module";
import { CoreStatusStickerModule } from "src/app/libraries/core-status-sticker/core-status-sticker.module";

@NgModule({
  imports: [
    TlaSharedModule, 
    AccordionModule, 
    LibrariesModule,
    CorePageListModule,
    CoreOrgTreeModule,
    CorePageEditModule,
    CorePageHeaderModule,
    DecisionRoutingModule,
    CoreButtonGroupVnsModule,
    FullscreenModalLoaderModule,
    AppPipesModule,
    CoreStatusStickerModule
  ],
  declarations: [DecisionComponent, DecisionEditComponent, DecisionImportComponent],
  providers: [CoreService],
})
export class DecisionModule {}
