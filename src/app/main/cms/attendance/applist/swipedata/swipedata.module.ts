import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { SwipeDataComponent } from "./swipedata.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { CoreCompositionModule } from "src/app/libraries/core-composition/core-composition.module";
import { CorePageListContentModule } from "src/app/libraries/core-page-list-content/core-page-list-content.module";
import { SwipeDataImportComponent } from './swipe-data-import/swipe-data-import.component';
import { FullscreenModalLoaderModule } from "src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module";
import { CoreButtonGroupVnsModule } from "src/app/libraries/core-button-group-vns/core-button-group-vns.module";
import { AppPipesModule } from "src/app/app-pipes/app-pipes.module";

const routes: Routes = [
  {
    path: "",
    component: SwipeDataComponent,
    children: [
      {
        path: "swipe-data-import",
        outlet: "corePageListAux",
        component: SwipeDataImportComponent
      }
    ]
  },
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    CorePageHeaderModule,
    CoreCompositionModule,
    CoreOrgTreeModule,
    CorePageListModule,
    CorePageListContentModule,
    AppPipesModule,
    CoreButtonGroupVnsModule,
    FullscreenModalLoaderModule,
    CoreOrgTreeModule
  ],
  declarations: [SwipeDataComponent, SwipeDataImportComponent],
})
export class SwipeDataModule {}