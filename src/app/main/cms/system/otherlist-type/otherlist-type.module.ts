import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherlistTypeRoutingModule } from './otherlist-type-routing.module';
import { OtherlistTypeComponent } from './otherlist-type/otherlist-type.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { DirectiveModule } from 'src/app/directives/directive.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { OtherlistTypeEditComponent } from './otherlist-type-edit/otherlist-type-edit.component';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { InitializationCanActivateFn } from 'src/app/guards/initialization.guard';
import { CoreOrgTreeModule } from 'src/app/libraries/core-org-tree/core-org-tree.module';
import { CorePageHeaderModule } from 'src/app/libraries/core-page-header/core-page-header.module';
import { CoreCompositionModule } from 'src/app/libraries/core-composition/core-composition.module';
import { CoreListModule } from 'src/app/libraries/core-list/core-list.module';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';



const routes: Routes = [
  {
    path: '',
    component: OtherlistTypeComponent,
    children: [
      {
        path: ':id',
        component: OtherlistTypeEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      },
    ]
  }
];
@NgModule({
  declarations: [
    OtherlistTypeComponent,
    OtherlistTypeEditComponent
  ],
  imports: [
    CorePageListModule,
    CorePageEditModule,
    TlaSharedModule,
    LibrariesModule,
    RouterModule.forChild(routes),
    DirectiveModule,
    AppPipesModule,
  ]
})
export class OtherlistTypeModule { }
