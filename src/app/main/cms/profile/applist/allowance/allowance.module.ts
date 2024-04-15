import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AllowanceComponent } from "./allowance.component";
import { CoreService } from "src/app/services/core.service";
import { AllowanceEditComponent } from "./edit/allowance-edit.component";
import { TlaSharedModule } from "src/app/components/shared.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { CoreCheckboxModule } from "src/app/libraries/core-checkbox/core-checkbox.module";
import { CoreStatusStickerModule } from "src/app/libraries/core-status-sticker/core-status-sticker.module";
const routes: Routes = [
  {
    path: "",
    component: AllowanceComponent,
    children: [
      {
        path: ":id",
        component: AllowanceEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes), 
    TlaSharedModule,
    CorePageListModule,
    CoreCheckboxModule,
    CoreStatusStickerModule,
    CorePageEditModule],
  declarations: [AllowanceComponent, AllowanceEditComponent],
  providers: [CoreService],
})
export class AllowanceModule {}
