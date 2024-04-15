import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HolidayComponent } from "./holiday.component";
import { CoreService } from "src/app/services/core.service";
import { HolidayEditComponent } from "./edit/holiday-edit.component";
import { TlaSharedModule } from "src/app/components/shared.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from "src/app/libraries/core-page-edit/core-page-edit.module";
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";
import { CoreStatusStickerModule } from "src/app/libraries/core-status-sticker/core-status-sticker.module";

const routes: Routes = [
  {
    path: "",
    component: HolidayComponent,
    children: [{
      path: ":id",
      component: HolidayEditComponent,
      outlet: "corePageListAux",
      canDeactivate: [CanDeactivateGuard]
    }]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), 
    TlaSharedModule,
    CorePageListModule,
    CorePageEditModule,
    CoreStatusStickerModule
  ],
  declarations: [HolidayComponent,HolidayEditComponent],
  providers: [CoreService],
})
export class HolidayModule {}
