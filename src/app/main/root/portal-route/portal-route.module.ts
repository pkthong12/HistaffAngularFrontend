import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';

import { PortalRouteRoutingModule } from './portal-route-routing.module';
import { PortalRouteComponent } from './portal-route.component';
import { PortalRouteEditComponent } from './portal-route-edit/portal-route-edit.component';

@NgModule({
  declarations: [
    PortalRouteComponent,
    PortalRouteEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PortalRouteRoutingModule,
    LibrariesModule,
    CorePageListModule,
    CorePageEditModule,
  ]
})
export class PortalRouteModule { }
