import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { AppService } from 'src/app/services/app.service';

// tôi từng bị lỗi
// không điều hướng được trang
// cách giải quyết là thêm thư viện CommonModule
import { CommonModule } from '@angular/common';

// sử dụng thẻ core-page-list
// thì phải thêm thư viện CorePageListModule
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';


// sử dụng thẻ core-checkbox
// thì phải thêm thư viện CoreCheckboxModule
import { CoreCheckboxModule } from 'src/app/libraries/core-checkbox/core-checkbox.module';


// sử dụng thẻ core-page-edit
// thì phải thêm thư viện CorePageEditModule
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';


// thêm code
// vì tạo mới component
import { ConfigurationCommonComponent } from './configuration-common.component';
import { ConfigurationCommonEditComponent } from './configuration-common-edit/configuration-common-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationCommonComponent,
  },
  {
    path: ':id',
    component: ConfigurationCommonEditComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];

@NgModule({
  declarations: [
    ConfigurationCommonComponent,
    ConfigurationCommonEditComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    
    // vì bạn có dòng code
    // *ngIf="!!sections.length"
    // nên phải thêm CommonModule
    CommonModule,

    // thẻ core-page-list
    CorePageListModule,

    // thẻ core-checkbox
    CoreCheckboxModule,

    // thẻ core-page-edit
    CorePageEditModule
  ],
  providers: [AppService]
})
export class ConfigurationCommonModule {}