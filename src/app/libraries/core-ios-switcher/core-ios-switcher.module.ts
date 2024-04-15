import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreIosSwitcherComponent } from './core-ios-switcher/core-ios-switcher.component';

import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    CoreIosSwitcherComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppPipesModule
  ],
  exports: [CoreIosSwitcherComponent]
})
export class CoreIosSwitcherModule { }
