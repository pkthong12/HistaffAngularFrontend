import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PersonnelLeftMenuComponent } from './personnel-left-menu/personnel-left-menu.component';

import { CoreFileUploaderModule } from 'src/app/libraries/core-file-uploader/core-file-uploader.module';
import { CoreLineModule } from 'src/app/libraries/core-line/core-line.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { PipesModule } from 'src/app/libraries/pipes/pipes.module';
import { TooltipModule } from 'src/app/libraries/tooltip/tooltip.module';

@NgModule({
  declarations: [
    PersonnelLeftMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CoreFileUploaderModule,
    CoreLineModule,
    AppPipesModule,
    PipesModule,
    TooltipModule,
  ],
  exports: [PersonnelLeftMenuComponent]
})
export class PersonnelLeftMenuModule { }
