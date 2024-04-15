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
import { InsRegionRoutingModule } from "./insregion-routing.module";
import { InsRegionComponent } from "./insregion.component";
import { InsRegionEditComponent } from "./edit/insregion-edit.component";
import { CoreStatusStickerModule } from "src/app/libraries/core-status-sticker/core-status-sticker.module";



@NgModule({
  imports: [
    TlaSharedModule,
    AccordionModule,
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
    InsRegionRoutingModule,
    CorePageHeaderModule,
    CoreStatusStickerModule
  ],
  declarations: [InsRegionComponent, InsRegionEditComponent],
})
export class InsRegionModule {}