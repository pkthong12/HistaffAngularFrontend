import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HuWardComponent } from "./hu-ward.component";
import { CoreService } from "src/app/services/core.service";
import { HuWardEditComponent } from "./hu-ward-edit/hu-ward-edit.component";
import { TlaSharedModule } from "src/app/components/shared.module";
import { CorePageEditModule } from "src/app/libraries/core-page-edit/core-page-edit.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";
import { CoreStatusStickerModule } from "src/app/libraries/core-status-sticker/core-status-sticker.module";

const routes: Routes = [
  {
    path: "",
    component: HuWardComponent,
    children: [
      {
        path: ":id",
        component: HuWardEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TlaSharedModule,
    CorePageListModule,
    CorePageHeaderModule,
    CorePageEditModule,
    CoreStatusStickerModule
  ],
  declarations: [HuWardComponent, HuWardEditComponent],
  providers: [CoreService],
})
export class HuWardModule { }