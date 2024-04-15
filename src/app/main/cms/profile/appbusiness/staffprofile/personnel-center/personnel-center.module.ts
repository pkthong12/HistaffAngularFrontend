import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PersonnelCenterRoutingModule } from './personnel-center-routing.module';
import { PersonnelCenterComponent } from './personnel-center.component';

import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CoreTabsModule } from 'src/app/libraries/core-tabs/core-tabs.module';

import { PersonnelLeftMenuModule } from './personnel-left-menu/personnel-left-menu.module';
import { AppPipesModule } from "../../../../../../app-pipes/app-pipes.module";

@NgModule({
    declarations: [
        PersonnelCenterComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        PersonnelCenterRoutingModule,
        CorePageHeaderModule,
        CoreTabsModule,
        PersonnelLeftMenuModule,
        AppPipesModule
    ]
})
export class PersonnelCenterModule { }
