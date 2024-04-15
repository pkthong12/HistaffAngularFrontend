import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InMemoryRoutingModule } from './in-memory-routing.module';
import { InMemoryComponent } from './in-memory/in-memory.component';

import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CoreTabsModule } from 'src/app/libraries/core-tabs/core-tabs.module';
import { CoreTableModule } from 'src/app/libraries/core-table/core-table.module';

@NgModule({
  declarations: [
    InMemoryComponent
  ],
  imports: [
    CommonModule,
    InMemoryRoutingModule,
    CorePageHeaderModule,
    CoreTabsModule,
    CoreTableModule,
  ]
})
export class InMemoryModule { }
