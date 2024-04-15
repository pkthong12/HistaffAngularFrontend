import { Routes } from '@angular/router';
import { Error404Component } from '../../errors/404/error-404.component';

export const TrainingRoutes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/cms/training/course',
  //   pathMatch: 'full',
  // },
  {
    path: 'business',
    loadChildren: () => import('./appbusiness/trainingbusiness.module').then((m) => m.TrainingBusinessModule),
  },
  {
    path: '**',
    component: Error404Component,
  },
];
