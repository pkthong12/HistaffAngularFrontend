import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from './page-title/page-title.component';

import { ButtonGroupModule } from '../button-group/button-group.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    PageTitleComponent
  ],
  imports: [
    CommonModule,
    ButtonGroupModule,
    AppPipesModule,
  ],
  exports: [
    PageTitleComponent,
  ]
})
export class PageTitleModule { }
