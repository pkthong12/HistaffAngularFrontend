import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BankComponent } from "./bank.component";
import { CoreService } from "src/app/services/core.service";
import { BankEditComponent } from "./bank-edit/bank-edit.component";
import { TlaSharedModule } from "src/app/components/shared.module";
import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { CorePageEditModule } from "src/app/libraries/core-page-edit/core-page-edit.module";
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";
import { CoreStatusStickerModule } from "src/app/libraries/core-status-sticker/core-status-sticker.module";

const routes: Routes = [
  {
    path: "",
    component: BankComponent,
    children: [
      {
        path: ":id",
        component: BankEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes),
    TlaSharedModule,
    LibrariesModule,
    CorePageListModule,
    CorePageHeaderModule,
    CoreStatusStickerModule,
    CorePageEditModule,],
  declarations: [BankComponent, BankEditComponent],
  providers: [CoreService],
})
export class BankModule {}
