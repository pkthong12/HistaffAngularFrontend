import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreEmployeeSeekerComponent } from './core-employee-seeker/core-employee-seeker.component';

import { FormsModule } from '@angular/forms';
import { CoreOrgTreeModule } from '../core-org-tree/core-org-tree.module';
import { CorePageListModule } from '../core-page-list/core-page-list.module';
import { AppPipesModule } from "../../app-pipes/app-pipes.module";


@NgModule({
    declarations: [
        CoreEmployeeSeekerComponent
    ],
    exports: [
        CoreEmployeeSeekerComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        CoreOrgTreeModule,
        CorePageListModule,
        AppPipesModule
    ]
})
export class CoreEmployeeSeekerModule { }
