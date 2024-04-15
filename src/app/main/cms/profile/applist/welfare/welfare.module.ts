import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { WelfareComponent } from "./welfare.component";
import { CoreService } from "src/app/services/core.service";
import { WelfareEditComponent } from "./edit/welfare-edit.component";
import { TlaSharedModule } from "src/app/components/shared.module";

import { LibrariesModule } from "src/app/libraries/libraries.module";

import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { CoreCheckboxModule } from "src/app/libraries/core-checkbox/core-checkbox.module";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CoreStatusStickerModule } from "src/app/libraries/core-status-sticker/core-status-sticker.module";

const routes: Routes = [
  {
    path: "",
    component: WelfareComponent,
    children: [
      {
        path: ":id",
        component: WelfareEditComponent,
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
    AccordionModule, 
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
    CorePageHeaderModule,
    CoreCheckboxModule,
    CoreStatusStickerModule
    
  ],
  exports: [RouterModule],
  declarations: [WelfareComponent, WelfareEditComponent],
  providers: [CoreService],

})
export class WelfareModule {}
