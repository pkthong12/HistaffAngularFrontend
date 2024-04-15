import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LibrariesModule } from "src/app/libraries/libraries.module";

import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { StaffProfileComponent } from "./staffprofile.component";
// import { CoreService } from "src/app/services/core.service";
import { TlaSharedModule } from "src/app/components/shared.module";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { ExcelExportService } from "@syncfusion/ej2-angular-grids";
import { CorePageEditModule } from "src/app/libraries/core-page-edit/core-page-edit.module";
import { CoreAccordionModule } from "src/app/libraries/core-accordion/core-accordion.module";
import { AppPipesModule } from "../../../../../app-pipes/app-pipes.module";
import { StaffprofileImportComponent } from "../staffprofile-import/staffprofile-import.component";
import { CoreButtonGroupVnsModule } from "src/app/libraries/core-button-group-vns/core-button-group-vns.module";
import { FullscreenModalLoaderModule } from "src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module";

const routes: Routes = [
  {
    path: "",
    component: StaffProfileComponent,
    children: [
      {
        path: "staffprofile-import",
        outlet: "corePageListAux",
        component: StaffprofileImportComponent
      }
    ]
  },
  {
    path: "change-info",
    loadChildren: () => import('./change-info/change-info.module').then(m => m.ChangeInfoModule)
  },
  {
    path: "app-staff-profile-edit",
    loadChildren: () => import('./staff-profile-edit/staff-profile-edit.module').then(m => m.StaffProfileEditModule)
  },
  {
    path: ":id",
    loadChildren: () => import('./personnel-center/personnel-center.module').then(m => m.PersonnelCenterModule)
  },
  
  

];

@NgModule({
    declarations: [StaffProfileComponent, StaffprofileImportComponent],
    providers: [ ExcelExportService ],
    imports: [
        RouterModule.forChild(routes),
        TlaSharedModule,
        AccordionModule,
        LibrariesModule,
        CorePageListModule,
        CoreOrgTreeModule,
        CorePageHeaderModule,
        CorePageEditModule,
        CoreAccordionModule,
        AppPipesModule,
        CoreButtonGroupVnsModule,
        FullscreenModalLoaderModule
    ]
})
export class StaffProfileModule {}
