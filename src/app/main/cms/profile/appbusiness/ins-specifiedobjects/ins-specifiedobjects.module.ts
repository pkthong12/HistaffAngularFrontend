import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CoreService } from "src/app/services/core.service";
import { TlaSharedModule } from "src/app/components/shared.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from "src/app/libraries/core-page-edit/core-page-edit.module";
import { CanDeactivateGuard } from "src/app/guards/can-deactivate.guard";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { SpecifiedObjectsComponent } from "./ins-specifiedobjects.component";
import { SpecifiedObjectsEditComponent } from "./edit/ins-specifiedobjects-edit.component";
import { CommonModule } from "@angular/common";
import { AppPipesModule } from "src/app/app-pipes/app-pipes.module";
import { ExcelExportService } from "@syncfusion/ej2-angular-grids";

const routes: Routes = [
  {
    path: "",
    component: SpecifiedObjectsComponent,
  },
  {
    path: ":id",
    component: SpecifiedObjectsEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TlaSharedModule,
    AccordionModule,
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
    CorePageHeaderModule,
  ],
  declarations: [SpecifiedObjectsComponent,SpecifiedObjectsEditComponent],
  providers: [CoreService, ExcelExportService],
})
export class SpecifiedObjectsModule {}
