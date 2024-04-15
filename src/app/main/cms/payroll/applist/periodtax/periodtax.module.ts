import { NgModule } from "@angular/core";

import { TlaSharedModule } from "src/app/components/shared.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from "src/app/libraries/core-page-edit/core-page-edit.module";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { PeriodTaxComponent } from "./periodtax.component";
import { PeriodTaxEditComponent } from "./edit/periodtax-edit.component";
import { PeriodTaxRoutingModule } from "./periodtax-routing.module";
import { CoreStatusStickerModule } from "src/app/libraries/core-status-sticker/core-status-sticker.module";
import { FullscreenModalLoaderModule } from "src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module";


@NgModule({
  imports: [
    TlaSharedModule,
    AccordionModule,
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
    CorePageHeaderModule,
    PeriodTaxRoutingModule,
    CoreStatusStickerModule,
  ],
  declarations: [PeriodTaxComponent, PeriodTaxEditComponent],
})
export class PeriodTaxModule { }
