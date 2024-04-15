import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreCurrencyInputComponent } from './core-currency-input/core-currency-input.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CoreCurrencyInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [CoreCurrencyInputComponent]
})
export class CoreCurrencyInputModule { }
