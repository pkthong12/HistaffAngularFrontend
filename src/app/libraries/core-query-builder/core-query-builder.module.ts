import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreQueryBuilderComponent } from './core-query-builder/core-query-builder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreDropdownModule } from '../core-dropdown/core-dropdown.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { AppPipesModule } from "../../app-pipes/app-pipes.module";



@NgModule({
    declarations: [
        CoreQueryBuilderComponent
    ],
    exports: [CoreQueryBuilderComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CoreDropdownModule,
        TooltipModule,
        AppPipesModule
    ]
})
export class CoreQueryBuilderModule { }
