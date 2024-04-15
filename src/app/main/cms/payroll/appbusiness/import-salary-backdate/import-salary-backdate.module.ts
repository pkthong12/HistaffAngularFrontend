import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

// thêm code
// vì tạo mới component
import { ImportSalaryBackdateComponent } from './import-salary-backdate.component';

// sử dụng thẻ core-org-tree
// thì phải thêm thư viện CoreOrgTreeModule
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';

// bạn muốn sử dụng thuộc tính [(ngModel)]
// bên trong thẻ core-org-tree
// thì bạn phải thêm thư viện TlaSharedModule
import { TlaSharedModule } from "src/app/components/shared.module";

// bạn code bị lỗi label năm
// bị không hiển thị năm
// bị không hiển thị được các cột
// thì thêm thư viện AppPipesModule
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

// bạn bị lỗi code chỗ [options$]
// và nó lại là Drop Down List
// tức là bạn bị thiếu thư viện về Drop Down List
// cách sửa lỗi là thêm thư viện CoreDropdownModule
import { CoreDropdownModule } from 'src/app/libraries/core-dropdown/core-dropdown.module';

// sử dụng thẻ core-form-control-seeker
// thì phải thêm thư viện CoreFormControlSeekerModule
import { CoreFormControlSeekerModule } from 'src/app/libraries/core-form-control-seeker/core-form-control-seeker.module';

// sử dụng thẻ core-checklist
// thì phải thêm thư viện CoreChecklistModule
import { CoreChecklistModule } from 'src/app/libraries/core-checklist/core-checklist.module';

// sử dụng thẻ core-button-group-vns
// thì phải thêm thư viện CoreButtonGroupVnsModule
import { CoreButtonGroupVnsModule } from 'src/app/libraries/core-button-group-vns/core-button-group-vns.module';

// sử dụng thẻ core-page-header
// thì phải thêm thư viện CorePageHeaderModule
import { CorePageHeaderModule } from "src/app/libraries/core-page-header/core-page-header.module";

// sử dụng thẻ core-composition
// thì phải thêm thư viện CoreCompositionModule
import { CoreCompositionModule } from "src/app/libraries/core-composition/core-composition.module";

// sử dụng thẻ core-table
// thì phải thêm thư viện CoreTableModule
import { CoreTableModule } from "src/app/libraries/core-table/core-table.module";

// sử dụng thẻ core-pagination-full
// thì phải thêm thư viện CorePaginationFullModule
import { CorePaginationFullModule } from "src/app/libraries/core-pagination-full/core-pagination-full.module";

import { FullscreenModalLoaderModule } from 'src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';

// tạo biến routes
const routes: Routes = [
  {
    path: '',
    component: ImportSalaryBackdateComponent
  }
];


// khai báo bộ trang trí (decorator)
@NgModule({
  declarations: [
    ImportSalaryBackdateComponent
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

    // thẻ core-org-tree
    CoreOrgTreeModule,

    // vì muốn sử dụng [(ngModel)]
    TlaSharedModule,

    // chữa lỗi hiển thị label năm
    // và lỗi hiển thị tên cột
    AppPipesModule,

    // sửa lỗi do
    // thuộc tính [options$] báo lỗi đỏ
    // cách sửa lỗi là thêm thư viện
    // liên quan đến Drop Down List
    CoreDropdownModule,

    // thẻ core-form-control-seeker
    CoreFormControlSeekerModule,

    // thẻ core-checklist
    CoreChecklistModule,

    // thẻ core-button-group-vns
    CoreButtonGroupVnsModule,

    // thẻ core-page-header
    CorePageHeaderModule,

    // thẻ core-composition
    CoreCompositionModule,

    // thẻ core-table
    CoreTableModule,
    FullscreenModalLoaderModule,

    // thẻ core-pagination-full
    CorePaginationFullModule
  ],
  providers: [AppService]
})


// khai báo lớp
export class ImportSalaryBackdateModule {}