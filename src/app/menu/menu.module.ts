import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu/menu.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';

import { CorePageHeaderModule } from '../libraries/core-page-header/core-page-header.module';
import { CoreTreeGridModule } from 'src/app/libraries/core-tree-grid/core-tree-grid.module';
import { CorePageEditModule } from '../libraries/core-page-edit/core-page-edit.module';

@NgModule({
  declarations: [
    MenuComponent,
    MenuEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MenuRoutingModule,
    CorePageHeaderModule,
    CoreTreeGridModule,
    CorePageEditModule,
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
