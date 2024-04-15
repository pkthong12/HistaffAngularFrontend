import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ContractTypeComponent } from "./contracttype.component";
import { CoreService } from "src/app/services/core.service";
import { ContractTypeEditComponent } from "./edit/contracttype-edit.component";
import { TlaSharedModule } from "src/app/components/shared.module";

import { LibrariesModule } from "src/app/libraries/libraries.module";

import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { CoreCheckboxModule } from "src/app/libraries/core-checkbox/core-checkbox.module";
import { CoreStatusStickerModule } from "src/app/libraries/core-status-sticker/core-status-sticker.module";


const routes: Routes = [
  {
    path: "",
    component: ContractTypeComponent,
    children: [
      {
        path: ":id",
        component: ContractTypeEditComponent,
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
    CorePageEditModule,
    CorePageHeaderModule,
    CoreCheckboxModule,
    CoreStatusStickerModule
  ],
  declarations: [ContractTypeComponent, ContractTypeEditComponent],
  providers: [CoreService],
})
export class ContractTypeModule {}
