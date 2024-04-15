import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreTagsComponent } from './core-tags/core-tags.component';

import { FormsModule } from '@angular/forms';
import { CoreButtonGroupModule } from '../core-button-group/core-button-group.module';
import { CoreButtonGroupVnsModule } from '../core-button-group-vns/core-button-group-vns.module';

@NgModule({
  declarations: [
    CoreTagsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreButtonGroupModule,
    CoreButtonGroupVnsModule,
  ],
  exports: [
    CoreTagsComponent
  ]
})
export class CoreTagsModule { }
