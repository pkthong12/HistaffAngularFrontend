import { NgModule } from "@angular/core";

import { TlaSharedModule } from "src/app/components/shared.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from "src/app/libraries/core-page-edit/core-page-edit.module";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { ListfundCompnent } from "./listfund.component";
import { ListfundEditComponent } from "./edit/listfund-edit.component";
import { ListfundRoutingModule } from "./listfund-routing.module";
import { CoreStatusStickerModule } from "src/app/libraries/core-status-sticker/core-status-sticker.module";


@NgModule({
  imports: [
    TlaSharedModule,
    AccordionModule,
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
    ListfundRoutingModule,
    CorePageHeaderModule,
    CoreStatusStickerModule
  ],
  declarations: [ListfundCompnent, ListfundEditComponent],
})
export class ListfundModule { }
