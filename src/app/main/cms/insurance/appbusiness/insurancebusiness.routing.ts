import { Routes } from '@angular/router';

export const InsuranceBusinessRoutes: Routes = [
  {
    path: '',
    redirectTo: '/cms/insurance/business/ins-arising',
    pathMatch: 'full',
  },
  {
    path: 'ins-arising',
    loadChildren: () => import('./ins-arising/ins-arising.module').then((m) => m.InsArisingModule),
  },
  {
    path: 'insinformation',
    loadChildren: () => import('./insinformation/insinformation.module').then((m) => m.InsInformationModule),
  },
  {
    path: 'insgroup',
    loadChildren: () => import('./insgroup/insgroup.module').then((m) => m.InsGroupModule),
  },
  {
    path: 'insregimes',
    loadChildren: () => import('./ins-regimes/ins-regimes.module').then((m) => m.InsRegimesModule),
  },
  {
    path: 'insregimes-mng',
    loadChildren: () => import('./insregimes-mng/insregimes-mng.module').then((m) => m.InsRegimesMngModule),
  },
  {
    path: 'inschange',
    loadChildren: () => import('./inschange/inschange.module').then((m) => m.InsChangeModule),
  },
  {
    path: 'insregion',
    loadChildren: () => import('./insregion/insregion.module').then((m) => m.InsRegionModule),
  },
];
