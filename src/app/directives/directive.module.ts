import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageErrorResolverDirective } from './image-error-resolver.directive';

@NgModule({
  declarations: [ImageErrorResolverDirective,],
  imports: [
    CommonModule,
  ],
  exports: [
    ImageErrorResolverDirective,
  ]
})
export class DirectiveModule { }
