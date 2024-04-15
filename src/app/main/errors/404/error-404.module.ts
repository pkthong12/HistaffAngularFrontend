import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Error404Component } from './error-404.component';
import { AnimatedTextModule } from 'src/app/libraries/animated-text/animated-text.module';
import { AppPipesModule } from 'src/app/app-pipes/app-pipes.module';

const routes = [
    {
        path: 'errors/error-404',
        component: Error404Component
    }
];

@NgModule({
    declarations: [
        Error404Component
    ],
    imports: [
        RouterModule.forChild(routes),
        AnimatedTextModule,
        AppPipesModule,
    ]
})
export class Error404Module {
}
