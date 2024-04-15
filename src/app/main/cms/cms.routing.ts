import { Routes } from '@angular/router';
import { Error404Component } from '../../main/errors/404/error-404.component';

export const CmsRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.AppDashboardModule),
  },
  {
    path: 'insurance',
    loadChildren: () => import('./insurance/insurance.module').then((m) => m.InsuranceModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'payroll',
    loadChildren: () => import('./payroll/payroll.module').then((m) => m.PayrollModule),
  },
  {
    path: 'attendance',
    loadChildren: () => import('./attendance/attendance.module').then((m) => m.AttendanceModule),
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then((m) => m.ReportModule),
  },
  {
    path: 'system',
    loadChildren: () => import('./system/system.module').then((m) => m.SystemModule),
  },
  {
    path: 'training',
    loadChildren: () => import('./training/training.module').then((m) => m.TrainingModule),
  },
  {
    path: 'core-hrm',
    loadChildren: () => import('./core-hrm/core-hrm.module').then((m) => m.CoreHrmModule),
  },
  {
    path: 'change-password',
    loadChildren: () => import('../../auth/change-password/change-password.module').then((m) => m.ChangePasswordModule),
  },
  {
    path: 'media',
    loadChildren: () => import('./media/media.module').then((m) => m.MediaModule),
  },
  {
    path: 'administration',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.AppDashboardModule),
  },
  {
    path: 'others',
    loadChildren: () => import('./others/others.module').then((m) => m.OthersModule),
  },
  {
    path: 'organize',
    loadChildren: () => import('./organize/organize.module').then((m) => m.OrganizeModule),
  },
  {
    path: 'dev-demo',
    loadChildren: () => import('./demo/demo.module').then((m) => m.DemoModule),
  },
  {
    path: "settings",
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) 
  },
  {
    path: '**',
    component: Error404Component,
  },
];
