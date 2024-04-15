import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationHeaderComponent } from './notification-header/notification-header.component';

import { DirectiveModule } from 'src/app/directives/directive.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    NotificationHeaderComponent
  ],
  imports: [
    CommonModule,
    DirectiveModule,
    AppPipesModule
  ],
  exports: [
    NotificationHeaderComponent
  ]
})
export class NotificationHeaderModule { }
