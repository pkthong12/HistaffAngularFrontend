import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AnimatedTextModule } from './animated-text/animated-text.module';

import { CommonToolsComponent } from './common-tools/common-tools.component';
import { CoreFormControlBaseComponent } from './core-form-control-base/core-form-control-base.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AnimatedTextModule],
  declarations: [CommonToolsComponent, CoreFormControlBaseComponent],
  exports: [CommonToolsComponent],
})
export class LibrariesModule {}
