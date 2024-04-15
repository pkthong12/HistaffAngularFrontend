import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CssThemeComponent } from './css-theme.component';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CssThemeRoutingModule } from './css-theme-routing.module';

@NgModule({
  declarations: [CssThemeComponent],
  imports: [
    CommonModule,
    LibrariesModule,
    CssThemeRoutingModule,
    CorePageListModule,
    CorePageEditModule,
  ],
})
export class CssThemeModule {}
