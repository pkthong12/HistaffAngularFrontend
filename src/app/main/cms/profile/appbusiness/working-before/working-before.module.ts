import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreButtonGroupVnsModule } from "src/app/libraries/core-button-group-vns/core-button-group-vns.module";
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { ExcelExportService } from "@syncfusion/ej2-angular-grids";
import { WorkingBeforeRoutingModule } from './working-before-routing.module';
import { WorkingBeforeComponent } from './working-before/working-before.component';
import { WorkingBeforeEditComponent } from './working-before-edit/working-before-edit.component';
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { TlaSharedModule } from "src/app/components/shared.module";
import { CoreService } from "src/app/services/core.service";
import { HuWorkingBeforeImportComponent } from '../hu-working-before-import/hu-working-before-import.component';
import { FullscreenModalLoaderModule } from 'src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CoreAccordionModule } from 'src/app/libraries/core-accordion/core-accordion.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";


@NgModule({
  declarations: [
    WorkingBeforeComponent,
    WorkingBeforeEditComponent,
    HuWorkingBeforeImportComponent
  ],
  providers: [
    // anh Văn Tân bảo bỏ CoreService vì nó bị outdated
    // CoreService,

    ExcelExportService
  ],
  imports: [
    CommonModule,
    WorkingBeforeRoutingModule,
    LibrariesModule,
    CorePageListModule,
    CoreOrgTreeModule,
    CorePageEditModule,
    TlaSharedModule,
    CoreButtonGroupVnsModule,
    FullscreenModalLoaderModule,
    AccordionModule,
    CorePageHeaderModule,
    CoreAccordionModule,
    AppPipesModule
  ]
})


export class WorkingBeforeModule { }