import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreAttachmentComponent } from './core-attachment/core-attachment.component';

import { FormsModule } from '@angular/forms';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
  declarations: [
    CoreAttachmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule,
  ],
  exports: [CoreAttachmentComponent]
})
export class CoreAttachmentModule { }
