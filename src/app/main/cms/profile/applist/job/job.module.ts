import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LibrariesModule } from "src/app/libraries/libraries.module";

import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";

import { JobComponent } from "./job.component";
import { CoreService } from "src/app/services/core.service";
import { JobEditComponent } from "./edit/job-edit.component";
import { TlaSharedModule } from "src/app/components/shared.module";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { ExcelExportService } from "@syncfusion/ej2-angular-grids";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";
import { CoreStatusStickerModule } from "src/app/libraries/core-status-sticker/core-status-sticker.module";

const routes: Routes = [
  {
    path: "",
    component: JobComponent,
    children: [
      {
        path: ":id",
        component: JobEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
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
    CoreStatusStickerModule
  ],
  declarations: [JobComponent, JobEditComponent],
  providers: [CoreService, ExcelExportService],
})
export class JobModule {}
