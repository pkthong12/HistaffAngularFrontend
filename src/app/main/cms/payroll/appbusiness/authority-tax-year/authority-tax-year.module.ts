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
import { CoreCompositionModule } from "src/app/libraries/core-composition/core-composition.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";
import { ExcelExportService } from "@syncfusion/ej2-angular-grids";
import { AuthorityTaxYearComponent } from "./authority-tax-year.component";
import { AuthorityTaxYearRoutingModule } from "./authority-tax-year-routing.module";
import { AuthorityTaxYearEditComponent } from "./edit/authority-tax-year-edit.component";
import { CoreCheckboxModule } from "src/app/libraries/core-checkbox/core-checkbox.module";


@NgModule({
  imports: [
    TlaSharedModule,
    AccordionModule,
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
    AuthorityTaxYearRoutingModule,
    CorePageHeaderModule,
    CoreCompositionModule,
    CoreOrgTreeModule,
    CoreCheckboxModule
  ],
  declarations: [AuthorityTaxYearComponent, AuthorityTaxYearEditComponent],
  providers: [CoreService, ExcelExportService],
})
export class AuthorityTaxYearModule {}
