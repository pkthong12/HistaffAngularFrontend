import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthProfileComponent } from './auth-profile/auth-profile.component';

import { DirectiveModule } from 'src/app/directives/directive.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';


@NgModule({
  declarations: [AuthProfileComponent],
  imports: [
    CommonModule,
    DirectiveModule,
    AppPipesModule,
  ],
  exports: [
    AuthProfileComponent
  ]
})
export class AuthProfileModule { }
