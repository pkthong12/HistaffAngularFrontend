import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { CoreService } from 'src/app/services/core.service';
import { UserEditComponent } from './edit/user-edit.component';
import { TlaSharedModule } from 'src/app/components/shared.module';
import { LibrariesModule } from 'src/app/libraries/libraries.module';
import { DirectiveModule } from 'src/app/directives/directive.module';
import { CorePageListModule } from 'src/app/libraries/core-page-list/core-page-list.module';
import { CorePageEditModule } from 'src/app/libraries/core-page-edit/core-page-edit.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';
import { CoreCheckboxModule } from 'src/app/libraries/core-checkbox/core-checkbox.module';

import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { CoreLoadingSurfaceComponent } from 'src/app/libraries/core-loading-surface/core-loading-surface/core-loading-surface.component';
import { CoreLoadingSurfaceModule } from 'src/app/libraries/core-loading-surface/core-loading-surface.module';
import { FullscreenModalLoaderModule } from 'src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    /* WHEN YOU WANT POPUP */
    children: [
      {
        path: ':id',
        component: UserEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }  
    ]
  },
  /* WHEN YOU DO NOT WANT POPUP */
  /*
  {
    path: ':id',
    component: UserEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
  */
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CorePageListModule,
    CorePageEditModule,
    TlaSharedModule,
    LibrariesModule,
    DirectiveModule,
    AppPipesModule,
    CoreCheckboxModule,
    FullscreenModalLoaderModule
  ],
  declarations: [UserComponent, UserEditComponent],
  providers: [CoreService]
})
export class UserModule {}
