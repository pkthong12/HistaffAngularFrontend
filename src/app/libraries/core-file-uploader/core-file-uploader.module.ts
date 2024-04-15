import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreFileUploaderComponent } from './core-file-uploader/core-file-uploader.component';

import { FormsModule } from '@angular/forms';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { ThreedotsModule } from '../threedots/threedots.module';
import { DirectiveModule } from 'src/app/directives/directive.module';

@NgModule({
  declarations: [
    CoreFileUploaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppPipesModule,
    ThreedotsModule,
    DirectiveModule
  ],
  exports: [
    CoreFileUploaderComponent
  ]
})
export class CoreFileUploaderModule { }
