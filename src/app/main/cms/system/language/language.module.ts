import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';

import { LanguageRoutingModule } from './language-routing.module';
import { LanguageComponent } from './language/language.component';
import { LanguageEditComponent } from './language-edit/language-edit.component';


@NgModule({
  declarations: [
    LanguageComponent,
    LanguageEditComponent
  ],
  imports: [
    CommonModule,
    LanguageRoutingModule,
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
  ]
})
export class LanguageModule { }
