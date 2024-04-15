import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicReportRoutingModule } from './dynamic-report-routing.module';
import { DynamicReportComponent } from './dynamic-report/dynamic-report.component';
import { CoreCompositionModule } from 'src/app/libraries/core-composition/core-composition.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CoreButtonGroupVnsModule } from 'src/app/libraries/core-button-group-vns/core-button-group-vns.module';
import { CoreTableModule } from 'src/app/libraries/core-table/core-table.module';
import { CoreDropdownModule } from 'src/app/libraries/core-dropdown/core-dropdown.module';
import { CorePaginationFullModule } from 'src/app/libraries/core-pagination-full/core-pagination-full.module';
import { CoreCheckboxModule } from 'src/app/libraries/core-checkbox/core-checkbox.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

import { CoreQueryBuilderModule } from 'src/app/libraries/core-query-builder/core-query-builder.module';
import { CoreCommonParamKitModule } from 'src/app/libraries/core-common-param-kit/core-common-param-kit.module';
import { PipesModule } from "../../../../../libraries/pipes/pipes.module";

@NgModule({
    declarations: [
        DynamicReportComponent
    ],
    imports: [
        CommonModule,
        DynamicReportRoutingModule,
        CoreCompositionModule,
        CorePageHeaderModule,
        LibrariesModule,
        CoreOrgTreeModule,
        FormsModule,
        ReactiveFormsModule,
        CoreButtonGroupVnsModule,
        CoreTableModule,
        CoreDropdownModule,
        CorePaginationFullModule,
        CoreCheckboxModule,
        AppPipesModule,
        CoreQueryBuilderModule,
        CoreCommonParamKitModule,
        PipesModule
    ]
})
export class DynamicReportModule { }
