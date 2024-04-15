import { Routes } from '@angular/router';

export const TrainingBusinessRoutes: Routes = [
  {
    path: 'center',
    loadChildren: () => import('./trainingcenter/trainingcenter.module').then((m) => m.TrainingCenterModule),
  },
  {
    path: 'trcourse',
    loadChildren: () =>
      import('./trainingcourse/trainingcourse.module').then((m) => m.TrainingCourseModule),
  },
  {
    path: 'tr-plan',
    loadChildren: () => import('./trplan/trplan.module').then((m) => m.TrplanModule)
  }
];
