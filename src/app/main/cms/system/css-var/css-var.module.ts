import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CssVarComponent } from './css-var.component';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CssVarRoutingModule } from './css-var-routing.module';
import { CSSVarEditComponent } from './edit/edit.component';

@NgModule({
  declarations: [CssVarComponent, CSSVarEditComponent],
  imports: [
    CommonModule,
    LibrariesModule,
    CssVarRoutingModule,
    CorePageListModule,
    CorePageEditModule,
  ],
})
export class CssVarModule {}
