import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { PayrollFormulaComponent } from "./payrollformula.component";
import { PayrollFormulaEditComponent } from "./edit/payrollformula-edit.component";
import { LibrariesModule } from "src/app/libraries/libraries.module";
import { CorePageListModule } from "src/app/libraries/core-page-list/core-page-list.module";
import { CorePageEditModule } from "src/app/libraries/core-page-edit/core-page-edit.module";
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";
import { PayrollFormulaRoutingModule } from "./payrollformula-routing.module";
import { CoreFormModule } from "src/app/libraries/core-form/core-form.module";
import { CoreListModule } from "src/app/libraries/core-list/core-list.module";
import { CoreButtonGroupVnsModule } from "src/app/libraries/core-button-group-vns/core-button-group-vns.module";
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { CommonModule } from "@angular/common";
import { CoreStatusStickerModule } from "src/app/libraries/core-status-sticker/core-status-sticker.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
    CorePageHeaderModule,
    PayrollFormulaRoutingModule,
    CoreFormModule,
    CoreListModule,
    CoreButtonGroupVnsModule,
    AppPipesModule,
    CoreStatusStickerModule
  ],
  declarations: [PayrollFormulaComponent, PayrollFormulaEditComponent],
})
export class PayrollFormulaModule {}
