import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrgchartRoutingModule } from './orgchart-routing.module';
import { OrgchartComponent } from './orgchart.component';

import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CoreOrgchartflexModule } from 'src/app/libraries/core-orgchartflex/core-orgchartflex.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { PipesModule } from 'src/app/libraries/pipes/pipes.module';
import { CoreLoadingSurfaceModule } from 'src/app/libraries/core-loading-surface/core-loading-surface.module';
import { TooltipModule } from 'src/app/libraries/tooltip/tooltip.module';
import { CoreIosSwitcherModule } from 'src/app/libraries/core-ios-switcher/core-ios-switcher.module';

@NgModule({
  declarations: [
    OrgchartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CorePageHeaderModule,
    AppPipesModule,
    PipesModule,
    OrgchartRoutingModule,
    CoreOrgchartflexModule,
    CoreLoadingSurfaceModule,
    TooltipModule,
    CoreIosSwitcherModule
  ]
})
export class OrgchartModule { }
