import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonGroupComponent } from './button-group.component';
import { CoreButtonComponent } from './core-button/core-button.component';

@NgModule({
  declarations: [
    ButtonGroupComponent,
    CoreButtonComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonGroupComponent,
  ]
})
export class ButtonGroupModule { }
