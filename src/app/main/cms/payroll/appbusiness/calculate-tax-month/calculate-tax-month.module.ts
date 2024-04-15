import { NgModule } from '@angular/core';

import { TlaSharedModule } from 'src/app/components/shared.module';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';
import { CoreCompositionModule } from 'src/app/libraries/core-composition/core-composition.module';
import { CoreDropdownModule } from 'src/app/libraries/core-dropdown/core-dropdown.module';
import { CoreDatePickerModule } from 'src/app/libraries/core-date-picker/core-date-picker.module';
import { CoreButtonGroupVnsModule } from 'src/app/libraries/core-button-group-vns/core-button-group-vns.module';
import { CommonModule } from '@angular/common';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { CoreTableModule } from 'src/app/libraries/core-table/core-table.module';
import { CorePaginationFullModule } from 'src/app/libraries/core-pagination-full/core-pagination-full.module';
import { FullscreenModalLoaderModule } from 'src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';
import { CalculateTaxMonthComponent } from './calculate-tax-month.component';
import { CalculateTaxMonthRoutingModule } from './calculate-tax-month-routing.module';
import { CoreHeaderParamsModule } from 'src/app/libraries/core-header-params/core-header-params.module';

@NgModule({
  imports: [
    CommonModule,
    TlaSharedModule,
    LibrariesModule,
    CoreCompositionModule,
    CorePageHeaderModule,
    CoreOrgTreeModule,
    AppPipesModule,
    CoreDropdownModule,
    CoreDatePickerModule,
    CoreButtonGroupVnsModule,
    CalculateTaxMonthRoutingModule,
    CoreTableModule,
    CorePaginationFullModule,
    FullscreenModalLoaderModule,
    CoreHeaderParamsModule
  ],
  declarations: [CalculateTaxMonthComponent],
})
export class CalculateTaxMonthModule {}
