import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageChangerComponent } from './language-changer/language-changer.component';

import { DirectiveModule } from 'src/app/directives/directive.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

@NgModule({
  declarations: [
    LanguageChangerComponent
  ],
  imports: [
    CommonModule,
    DirectiveModule,
    AppPipesModule
  ],
  exports: [
    LanguageChangerComponent
  ]
})
export class LanguageChangerModule { }
