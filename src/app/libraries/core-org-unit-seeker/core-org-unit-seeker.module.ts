import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreOrgUnitSeekerComponent } from './core-org-unit-seeker/core-org-unit-seeker.component';

import { CoreOrgTreeModule } from '../core-org-tree/core-org-tree.module';
import { AppPipesModule } from "../../app-pipes/app-pipes.module";
import { CorePageHeaderModule } from '../core-page-header/core-page-header.module';

@NgModule({
    declarations: [
        CoreOrgUnitSeekerComponent
    ],
    exports: [
        CoreOrgUnitSeekerComponent
    ],
    imports: [
        CommonModule,
        CoreOrgTreeModule,
        CorePageHeaderModule,
        AppPipesModule
    ]
})
export class CoreOrgUnitSeekerModule { }
