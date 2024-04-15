import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InsInformationComponent } from './insinformation.component';
import { InsInformationEditComponent } from './edit/insinformation-edit.component';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CoreCheckboxModule } from 'src/app/libraries/core-checkbox/core-checkbox.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreAccordionModule } from 'src/app/libraries/core-accordion/core-accordion.module';
import { CoreButtonGroupVnsModule } from 'src/app/libraries/core-button-group-vns/core-button-group-vns.module';
import { CoreControlModule } from 'src/app/libraries/core-control/core-control.module';

import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { InsInformationImportComponent } from './ins-information-import/ins-information-import.component';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { FullscreenModalLoaderModule } from 'src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';

const routes: Routes = [
  {
    path: '',
    component: InsInformationComponent,
    children: [
      {
        path: "ins-information-import",
        outlet: "corePageListAux",
        component: InsInformationImportComponent
      }
    ]
  },
  {
    path: ':id',
    component: InsInformationEditComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AppPipesModule,
    CorePageListModule,
    FormsModule,
    CoreButtonGroupVnsModule,
    CoreAccordionModule,
    ReactiveFormsModule,
    RouterModule,
    CoreOrgTreeModule,
    CoreControlModule,
    CoreCheckboxModule,
    CorePageHeaderModule,

    
    LibrariesModule,
    CorePageEditModule,
    
    // anh Văn Tân bảo bỏ TlaSharedModule
    //TlaSharedModule,
    
    FullscreenModalLoaderModule,
    
    // anh Văn Tân bảo bỏ AccordionModule
    // AccordionModule
  ],
  declarations: [InsInformationComponent, InsInformationEditComponent, InsInformationImportComponent],
})
export class InsInformationModule {}
