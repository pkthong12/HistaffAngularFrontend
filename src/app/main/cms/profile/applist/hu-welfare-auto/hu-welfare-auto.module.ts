import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HuWelfareAutoComponent } from './hu-welfare-auto.component';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { DirectiveModule } from 'src/app/directives/directive.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { HuWelfareAutoRoutingModule } from './hu-welfare-auto-routing';
import { HuWelfareAutoEditComponent } from './hu-welfare-auto-edit/hu-welfare-auto-edit.component';

import { CoreHeaderParamsModule } from 'src/app/libraries/core-header-params/core-header-params.module';
import { CoreOrgTreeModule } from "src/app/libraries/core-org-tree/core-org-tree.module";

@NgModule({
  declarations: [HuWelfareAutoComponent, HuWelfareAutoEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    LibrariesModule,
    CorePageEditModule,
    DirectiveModule,
    AppPipesModule,
    CorePageListModule,
    HuWelfareAutoRoutingModule,
    CoreOrgTreeModule,
    CoreHeaderParamsModule,
  ],
})
export class HuWelfareAutoModule {}
