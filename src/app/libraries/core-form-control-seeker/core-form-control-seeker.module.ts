import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreFormControlSeekerComponent } from './core-form-control-seeker/core-form-control-seeker.component';

import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { CoreTableModule } from '../core-table/core-table.module';

import { CoreEmployeeSeekerModule } from '../core-employee-seeker/core-employee-seeker.module';
import { CoreContractSeekerModule } from '../core-contract-seeker/core-contract-seeker.module';
import { CoreWorkingSeekerModule } from '../core-working-seeker/core-working-seeker.module';
import { CoreWageSeekerModule } from '../core-wage-seeker/core-wage-seeker.module';
import { CoreOrgUnitSeekerModule } from '../core-org-unit-seeker/core-org-unit-seeker.module';
import { CorePageHeaderModule } from '../core-page-header/core-page-header.module';
import { CorePositionSeekerModule } from '../core-position-seeker/core-position-seeker.module';
import { CorePositionConcurrentSeekerModule } from '../core-position-concurrent-seeker/core-position-concurrent-seeker.module';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
  declarations: [
    CoreFormControlSeekerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppPipesModule,
    CoreTableModule,
    CoreEmployeeSeekerModule,
    CoreContractSeekerModule,
    CoreWorkingSeekerModule,
    CoreWageSeekerModule,
    CoreOrgUnitSeekerModule,
    CorePositionSeekerModule,
    CorePositionConcurrentSeekerModule,
    CorePageHeaderModule,
    TooltipModule
  ],
  exports: [
    CoreFormControlSeekerComponent,
  ]
})
export class CoreFormControlSeekerModule { }
