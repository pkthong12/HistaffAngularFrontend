import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LibrariesModule } from "src/app/libraries/libraries.module";

import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";

import { QualificationComponent } from "./qualification.component";
import { CoreService } from "src/app/services/core.service";
import { QualificationEditComponent } from "./qualification-edit/qualification-edit.component";
import { TlaSharedModule } from "src/app/components/shared.module";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { ExcelExportService } from "@syncfusion/ej2-angular-grids";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";
import { CoreCheckboxModule } from "src/app/libraries/core-checkbox/core-checkbox.module";
import { FullscreenModalLoaderModule } from "src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module";
import { CoreButtonGroupVnsModule } from "src/app/libraries/core-button-group-vns/core-button-group-vns.module";
import { AppPipesModule } from "src/app/app-pipes/app-pipes.module";
import { QualificationImportComponent } from "../qualification-import/qualification-import.component";

const routes: Routes = [
  {
    path: "",
    component: QualificationComponent,
    children: [
      {
        path: "qualification-import",
        outlet: "corePageListAux",
        component: QualificationImportComponent
      },
      {
        path: ":id",
        component: QualificationEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      },
      
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TlaSharedModule,
    AccordionModule,
    LibrariesModule,
    CorePageListModule,
    CoreOrgTreeModule,
    CorePageEditModule,
    CorePageHeaderModule,
    CoreCheckboxModule,
    FullscreenModalLoaderModule,
    CoreButtonGroupVnsModule,
    AppPipesModule,
  ],
  declarations: [QualificationComponent, QualificationEditComponent, QualificationImportComponent],
  providers: [CoreService, ExcelExportService],
})
export class QualificationModule {}
