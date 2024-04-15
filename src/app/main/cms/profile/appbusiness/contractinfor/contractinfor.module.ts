import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ContractInforComponent } from "./contractinfor.component";
import { ContractInforEditComponent } from "./edit/contractinfor-edit.component";

import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { CoreService } from "src/app/services/core.service";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { ExcelExportService } from "@syncfusion/ej2-angular-grids";
import { TlaSharedModule } from "src/app/components/shared.module";
import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";
import { CoreTableModule } from "src/app/libraries/core-table/core-table.module";
import { ContractInfoImportComponent } from "./contract-info-import/contract-info-import.component";
import { CoreButtonGroupVnsModule } from "src/app/libraries/core-button-group-vns/core-button-group-vns.module";
import { FullscreenModalLoaderModule } from "../../../../../libraries/fullscreen-modal-loader/fullscreen-modal-loader.module";
import { AppPipesModule } from "src/app/app-pipes/app-pipes.module";
import { CoreStatusStickerModule } from "src/app/libraries/core-status-sticker/core-status-sticker.module";
import { CommonModule } from "@angular/common";
import { PipesModule } from "src/app/libraries/pipes/pipes.module";
import { LiquidateDialogComponent } from './liquidate-dialog/liquidate-dialog.component';

const routes: Routes = [
  {
    path: "",
    component: ContractInforComponent,
    children: [
      {
        path: "contract-import",
        component: ContractInfoImportComponent,
        outlet: "corePageListAux",
      },
      {
        path: ':id',
        component: LiquidateDialogComponent,
        outlet: 'corePageListAux'
      }
    ]
  },
  {
    path: ":id",
    component: ContractInforEditComponent,
    canDeactivate: [CanDeactivateGuard]
  },
];

@NgModule({
    declarations: [
      ContractInforComponent,
      ContractInforEditComponent,
      ContractInfoImportComponent,
      LiquidateDialogComponent
    ],
    providers: [CoreService],
    imports: [
        RouterModule.forChild(routes),
        TlaSharedModule,
        AccordionModule,
        LibrariesModule,
        CorePageListModule,
        CorePageEditModule,
        CoreOrgTreeModule,
        CoreTableModule,
        AppPipesModule,
        CoreButtonGroupVnsModule,
        FullscreenModalLoaderModule,
        CoreStatusStickerModule,
        CommonModule,
        PipesModule
    ]
})
export class ContractInforModule { }
