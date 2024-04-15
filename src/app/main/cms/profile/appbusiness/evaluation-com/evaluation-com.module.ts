import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CommonModule } from '@angular/common';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { EvaluationComComponent } from './evaluation-com.component';
import { EvaluationComEditComponent } from './evaluation-com-edit/evaluation-com-edit.component';
import { TlaSharedModule } from "src/app/components/shared.module";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";

// thêm code
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';
import { CoreService } from 'src/app/services/core.service';


// khi thấy code báo lỗi
// thì thêm thư viện
// chỗ HTML báo lỗi thì hãy thêm thư viện cho Module
import { FormsModule } from "@angular/forms";
import { CoreCompositionModule } from "src/app/libraries/core-composition/core-composition.module";
import { CoreTableModule } from "src/app/libraries/core-table/core-table.module";


// thêm thư viện CoreButtonGroupVnsModule
// để sử dụng thẻ core-button-group-vns
import { CoreButtonGroupVnsModule } from "src/app/libraries/core-button-group-vns/core-button-group-vns.module";


// thêm thư viện AppPipesModule
// vì nó liên quan đến "mapAvatarToServer"
import { AppPipesModule } from "../../../../../app-pipes/app-pipes.module";
import { EvaluationComImportComponent } from './evaluation-com-import/evaluation-com-import.component';
import { FullscreenModalLoaderModule } from 'src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';


const routes: Routes = [
  {
    path: '',
    component: EvaluationComComponent,
    children: [
      {
        path: "evaluation-com-import",
        outlet: "corePageListAux",
        component: EvaluationComImportComponent,

      },
      {
        path: ':id',
        component: EvaluationComEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      }      
    ],
  },
];

@NgModule({
  declarations: [
    EvaluationComComponent,
    EvaluationComEditComponent,
    EvaluationComImportComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule, LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
    CoreOrgTreeModule,


    // thêm code
    // thêm thư viện
    TlaSharedModule, 
    AccordionModule, 
    CorePageHeaderModule,


    FormsModule,
    CoreCompositionModule,


    // vì trong HTML
    // của cái component edit có phần tử core-table
    // nên phải thêm mô đun CoreTableModule
    CoreTableModule,


    // sử dụng thẻ core-button-group-vns
    CoreButtonGroupVnsModule,
    FullscreenModalLoaderModule,

    AppPipesModule
  ],
  providers: [CoreService]
})
export class EvaluationComModule {}
