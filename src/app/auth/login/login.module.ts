import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { FullscreenModalLoaderModule } from 'src/app/libraries/fullscreen-modal-loader/fullscreen-modal-loader.module';

import { InitializationCanActivateFn } from 'src/app/guards/initialization.guard';
import { MlsResolver } from 'src/app/resolvers/mls.resolver';

/*
const routes: Route[] = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [InitializationCanActivateFn],
        resolve: { preloaded: MlsResolver }
    },
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    },
];
*/

@NgModule({
    declarations: [
        //LoginComponent
    ],
    imports: [
        //RouterModule.forChild(routes),
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        CheckBoxModule,
        FullscreenModalLoaderModule,
    ],
})
export class LoginModule {
}
