import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreWageSeekerComponent } from './core-wage-seeker/core-wage-seeker.component';

import { FormsModule } from '@angular/forms';
import { CoreOrgTreeModule } from '../core-org-tree/core-org-tree.module';
import { CorePageListModule } from '../core-page-list/core-page-list.module';

@NgModule({
  declarations: [
    CoreWageSeekerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreOrgTreeModule,
    CorePageListModule,
  ],
  exports: [CoreWageSeekerComponent]
})
export class CoreWageSeekerModule { }
