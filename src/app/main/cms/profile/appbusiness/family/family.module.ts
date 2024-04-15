import { NgModule } from '@angular/core';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';

import { FamilyRoutingModule } from './family-routing.module';
import { FamilyComponent } from './family/family.component';
import { FamilyEditComponent } from './family-edit/family-edit.component';
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { TlaSharedModule } from "src/app/components/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { CoreCheckboxModule } from 'src/app/libraries/core-checkbox/core-checkbox.module';
import { CoreStatusStickerModule } from 'src/app/libraries/core-status-sticker/core-status-sticker.module';
import { HuFamilyImportComponent } from './family/hu-family-import/hu-family-import.component';
import { ExcelExportService } from "@syncfusion/ej2-angular-grids";
import { CoreButtonGroupVnsModule } from "src/app/libraries/core-button-group-vns/core-button-group-vns.module";
import { FullscreenModalLoaderModule } from 'src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';
import { CoreAccordionModule } from 'src/app/libraries/core-accordion/core-accordion.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  
  {
    path: "",
    component: FamilyComponent,
    children: [
      {
        path: "hu-family-import",
        outlet: "corePageListAux",
        component: HuFamilyImportComponent
      }
    ]
  },
  {
    path: "change-family-portal",
    loadChildren: () => import('./change-family-portal/change-family-portal.module').then(m => m.ChangeFamilyPortalModule)
  },
  {
    path: ":id",
    component: FamilyEditComponent,
    canDeactivate: [CanDeactivateGuard]
  },
];
@NgModule({
  providers: [
    ExcelExportService
  ],
  declarations: [
    FamilyComponent,
    FamilyEditComponent,
    HuFamilyImportComponent,
  ],
  imports: [
    RouterModule.forChild(routes), 
    TlaSharedModule,
    LibrariesModule,
    CorePageListModule,
    CoreOrgTreeModule,
    CorePageEditModule,
    CorePageHeaderModule,
    CoreCheckboxModule,
    CoreStatusStickerModule,
    CommonModule,
    CoreButtonGroupVnsModule,
    FullscreenModalLoaderModule,
    CoreAccordionModule,
    AppPipesModule
  ]
})
export class FamilyModule { }