import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluateDialogComponent } from './evaluate-dialog.component';
import { FormsModule } from '@angular/forms';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { CoreRadioGroupModule } from 'src/app/libraries/core-radio-group/core-radio-group.module';
import { CoreButtonGroupModule } from 'src/app/libraries/core-button-group/core-button-group.module';
import { CoreButtonGroupVnsModule } from 'src/app/libraries/core-button-group-vns/core-button-group-vns.module';
import { CoreDatePickerModule } from 'src/app/libraries/core-date-picker/core-date-picker.module';
import { PipesModule } from 'src/app/libraries/pipes/pipes.module';



@NgModule({
  declarations: [
    EvaluateDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CorePageHeaderModule,
    AppPipesModule,
    CoreRadioGroupModule,
    CoreButtonGroupVnsModule,
    CoreDatePickerModule,
    PipesModule
  ],
  exports: [
    EvaluateDialogComponent
  ]
})
export class EvaluateDialogModule { }
