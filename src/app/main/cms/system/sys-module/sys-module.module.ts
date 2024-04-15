import { NgModule } from '@angular/core';

import { SysModuleRoutingModule } from './sys-module-routing.module';
import { SysModuleComponent } from './sys-module/sys-module.component';
import { SysModuleEditComponent } from './sys-module-edit/sys-module-edit.component';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { RouterModule } from '@angular/router';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { CoreService } from 'src/app/services/core.service';
import { CoreCheckboxModule } from 'src/app/libraries/core-checkbox/core-checkbox.module';

@NgModule({
  declarations: [
    SysModuleComponent,
    SysModuleEditComponent
  ],
  imports: [
    TlaSharedModule,
    LibrariesModule,
    CorePageListModule,
    CorePageHeaderModule,
    RouterModule,
    CorePageEditModule,
    SysModuleRoutingModule,
    CoreCheckboxModule
  ],
  providers: [CoreService],

})
export class SysModuleModule { }
