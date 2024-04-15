import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HuEvaluateComponent } from './hu-evaluate.component';
import { HuEvaluateEditComponent } from './hu-evaluate-edit/hu-evaluate-edit.component';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { HuEvaluateRoutingModule } from './hu-evaluate.routing';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { CoreService } from 'src/app/services/core.service';
import { HuEvaluateImportComponent } from '../hu-evaluate-import/hu-evaluate-import.component';
import { FullscreenModalLoaderModule } from 'src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';
import { CoreButtonGroupVnsModule } from 'src/app/libraries/core-button-group-vns/core-button-group-vns.module';
import { ExcelService } from 'src/app/services/excel.service';
import { EvaluateDialogModule } from './evaluate-dialog/evaluate-dialog.module';
import { CoreApiProgressModule } from 'src/app/libraries/core-api-progress/core-api-progress.module';
import { HuEvaluateConcurrentImportComponent } from './hu-evaluate-concurrent-import/hu-evaluate-concurrent-import.component';
@NgModule({
  declarations: [HuEvaluateComponent, HuEvaluateEditComponent, HuEvaluateImportComponent, HuEvaluateConcurrentImportComponent],
  providers: [CoreService],
  imports: [
    CommonModule,
    LibrariesModule,
    HuEvaluateRoutingModule,
    TlaSharedModule,
    CorePageListModule,
    CorePageEditModule,
    CoreOrgTreeModule,
    AppPipesModule,
    FullscreenModalLoaderModule,
    CoreButtonGroupVnsModule,
    EvaluateDialogModule,
    CoreApiProgressModule
  ],
})
export class HuEvaluateModule { }
