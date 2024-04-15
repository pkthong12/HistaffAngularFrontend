import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TerminalEditComponent } from "./edit/terminal-edit.component";
import { TlaSharedModule } from "src/app/components/shared.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from "src/app/libraries/core-page-edit/core-page-edit.module";
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { TerminalComponent } from "./terminal.component";
import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { TerminalRoutingModule } from "./terminal-routing.module";
import { CoreService } from "src/app/services/core.service";
import { ExcelExportService } from "@syncfusion/ej2-angular-grids";
import { CoreStatusStickerModule } from "src/app/libraries/core-status-sticker/core-status-sticker.module";

// const routes: Routes = [
//   {
//     path: "",
//     component: TerminalComponent,
//     children: [{
//       path: ":id",
//       component: TerminalEditComponent,
//       outlet: "corePageListAux",
//       canDeactivate: [CanDeactivateGuard]
//     }]
//   }
// ];

@NgModule({
  imports: [
    TlaSharedModule,
    AccordionModule,
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
    TerminalRoutingModule,
    CorePageHeaderModule,
    CoreStatusStickerModule
  ],
  declarations: [TerminalComponent,TerminalEditComponent],
  providers: [CoreService, ExcelExportService],
})
export class TerminalModule {}
