import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LibrariesModule } from "src/app/libraries/libraries.module";

import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";

import { JobBandComponent } from "./job-band.component";
import { CoreService } from "src/app/services/core.service";
import { JobBandEditComponent } from "./edit/job-band-edit.component";
import { TlaSharedModule } from "src/app/components/shared.module";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { ExcelExportService } from "@syncfusion/ej2-angular-grids";
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";

const routes: Routes = [
  {
    path: "",
    component: JobBandComponent,
    children: [
      {
        path: ":id",
        component: JobBandEditComponent,
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
  ],
  declarations: [JobBandComponent, JobBandEditComponent],
  providers: [CoreService, ExcelExportService],
})
export class JobBandModule {}
