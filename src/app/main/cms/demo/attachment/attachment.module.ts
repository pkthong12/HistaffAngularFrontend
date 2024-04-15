import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AttachmentRoutingModule } from './attachment-routing.module';
import { DemoAttachmentListComponent } from './demo-attachment-list/demo-attachment-list.component';
import { DemoAttachmentEditComponent } from './demo-attachment-edit/demo-attachment-edit.component';

import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';

@NgModule({
  declarations: [
    DemoAttachmentListComponent,
    DemoAttachmentEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AttachmentRoutingModule,
    CorePageListModule,
    CorePageEditModule
  ]
})
export class AttachmentModule { }
