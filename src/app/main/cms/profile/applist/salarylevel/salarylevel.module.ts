import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SalaryLevelComponent } from "./salarylevel.component";
import { CoreService } from "src/app/services/core.service";
import { SalaryLevelEditComponent } from "./edit/salarylevel-edit.component";
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
    component: SalaryLevelComponent,
    children: [
      {
        path: ":id",
        component: SalaryLevelEditComponent,
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
  declarations: [SalaryLevelComponent, SalaryLevelEditComponent],
  providers: [CoreService],
})
export class SalaryLevelModule {}
