import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';

import { FormsModule } from '@angular/forms';

import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { CoreDropdownModule } from 'src/app/libraries/core-dropdown/core-dropdown.module';
import { CoreFormControlSeekerModule } from 'src/app/libraries/core-form-control-seeker/core-form-control-seeker.module';
import { CoreButtonGroupVnsModule } from 'src/app/libraries/core-button-group-vns/core-button-group-vns.module';
import { CoreChecklistModule } from 'src/app/libraries/core-checklist/core-checklist.module';
import { CoreDatePickerModule } from 'src/app/libraries/core-date-picker/core-date-picker.module';
import { ImportTaxAnnualRoutingModule } from './import-tax-annual.routing';
import { ImportTaxAnnualComponent } from './import-tax-annual.component';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { FullscreenModalLoaderModule } from 'src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';

@NgModule({
  declarations: [ImportTaxAnnualComponent],
  imports: [
    CommonModule,
    FormsModule,
    TlaSharedModule,
    LibrariesModule,
    ImportTaxAnnualRoutingModule,
    CoreOrgTreeModule,
    AppPipesModule,
    CorePageListModule,
    CorePageHeaderModule,
    CoreDropdownModule,
    CoreFormControlSeekerModule,
    CoreButtonGroupVnsModule,
    CoreChecklistModule,
    CoreDatePickerModule,
    FullscreenModalLoaderModule
  ],
})
export class ImportTaxAnnualModule {}
