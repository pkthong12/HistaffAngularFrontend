import { NgModule } from "@angular/core";

import { WageComponent } from "./wage.component";
import { CoreService } from "src/app/services/core.service";
import { WageEditComponent } from "./edit/wage-edit.component";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { ExcelExportService } from "@syncfusion/ej2-angular-grids";
import { WageRoutingModule } from "./wage-routing.module";
import { CommonModule } from "@angular/common";
import { CoreHeaderParamsModule } from "src/app/libraries/core-header-params/core-header-params.module";
import { DirectiveModule } from 'src/app/directives/directive.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { CoreStatusStickerModule } from "src/app/libraries/core-status-sticker/core-status-sticker.module";
import { CoreButtonGroupVnsModule } from 'src/app/libraries/core-button-group-vns/core-button-group-vns.module';
import { CoreAccordionModule } from 'src/app/libraries/core-accordion/core-accordion.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreControlModule } from 'src/app/libraries/core-control/core-control.module';
import { CoreCheckboxModule } from 'src/app/libraries/core-checkbox/core-checkbox.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { FullscreenModalLoaderModule } from 'src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';
import { HuWorkingHslPcImportComponent } from "./hu-working-hsl-pc-import/hu-working-hsl-pc-import.component";
import { EvaluateDialogModule } from "../../applist/hu-evaluate/evaluate-dialog/evaluate-dialog.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LibrariesModule,
    CorePageEditModule,
    DirectiveModule,
    AppPipesModule,
    CorePageListModule,
    WageRoutingModule,
    CoreOrgTreeModule,
    CoreHeaderParamsModule,
    CoreStatusStickerModule,

    CoreButtonGroupVnsModule,
    CoreAccordionModule,
    ReactiveFormsModule,
    CoreControlModule,
    CoreCheckboxModule,
    CorePageHeaderModule,
    
    // anh Văn Tân bảo bỏ TlaSharedModule
    //TlaSharedModule,
    
    FullscreenModalLoaderModule,
    EvaluateDialogModule
    
    // anh Văn Tân bảo bỏ AccordionModule
    // AccordionModule
  ],
  declarations: [
    WageComponent,
    WageEditComponent,
    HuWorkingHslPcImportComponent
  ],
  providers: [
    // CoreService,
    ExcelExportService
  ],
})
export class WageModule {}
