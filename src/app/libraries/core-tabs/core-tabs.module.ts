import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreTabsComponent } from './core-tabs/core-tabs.component';

import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    CoreTabsComponent
  ],
  imports: [
    CommonModule,
    AppPipesModule
  ],
  exports: [
    CoreTabsComponent
  ]
})
export class CoreTabsModule { }
