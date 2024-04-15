import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { ContractAppendixComponent } from "./contractappendix.component";
import { CoreService } from "src/app/services/core.service";
import { ContractAppendixEditComponent } from "./edit/contractappendix-edit.component";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
// import { TlaSharedModule } from "src/app/components/shared.module";
// import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
// import { CorePageListContentModule } from "src/app/libraries/core-page-list-content/core-page-list-content.module";
import { CoreCompositionModule } from "src/app/libraries/core-composition/core-composition.module";
import { CoreTableModule } from "src/app/libraries/core-table/core-table.module";
import { ContractAppendixImportComponent } from "./contract-appendix-import/contract-appendix-import.component";
import { CoreButtonGroupVnsModule } from "src/app/libraries/core-button-group-vns/core-button-group-vns.module";
import { FullscreenModalLoaderModule } from "src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module";
import { AppPipesModule } from "../../../../../app-pipes/app-pipes.module";
import { CoreStatusStickerModule } from "src/app/libraries/core-status-sticker/core-status-sticker.module";

const routes: Routes = [
  {
    path: "",
    component: ContractAppendixComponent,
    children: [
      {
        path: "contract-appendix-import",
        component: ContractAppendixImportComponent,
        outlet: "corePageListAux",
      }
    ]
  },
  {
    path: ":id",
    component: ContractAppendixEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];
@NgModule({
    declarations: [ContractAppendixComponent, ContractAppendixEditComponent, ContractAppendixImportComponent],
    providers: [CoreService],
    imports: [
        RouterModule.forChild(routes),
        // TlaSharedModule,
        // LibrariesModule,
        CommonModule,
        CoreTableModule,
        CoreOrgTreeModule,
        CorePageListModule,
        CorePageEditModule,
        CoreCompositionModule,
        CoreButtonGroupVnsModule,
        // CorePageListContentModule,
        FormsModule,
        CorePageHeaderModule,
        FullscreenModalLoaderModule,
        AppPipesModule,
        CoreStatusStickerModule
    ]
})
export class ContractAppendixModule {}
