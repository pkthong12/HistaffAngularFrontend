import { Routes } from '@angular/router';

export const AttendanceBusinessRoutes: Routes = [
  {
    path: 'timesheet',
    //loadChildren: "./timesheet/timesheet.module#TimeSheetModule",
    loadChildren: () => import('./timesheet/timesheet.module').then((m) => m.TimeSheetModule),
  },
  {
    path: 'shiftsort',
    //loadChildren: "./shiftsort/shiftsort.module#ShiftSortModule",
    loadChildren: () => import('./shiftsort/shiftsort.module').then((m) => m.ShiftSortModule),
  },
  {
    path: 'dutyscheduled',
    //loadChildren: "./dutyscheduled/dutyscheduled.module#DutyScheduledModule",
    loadChildren: () => import('./dutyscheduled/dutyscheduled.module').then((m) => m.DutyScheduledModule),
  },
  {
    path: 'timelateearly',
    //loadChildren: "./timelateearly/timelateearly.module#TimeLateEarlyModule",
    loadChildren: () => import('./timelateearly/timelateearly.module').then((m) => m.TimeLateEarlyModule),
  },
  {
    path: 'time-timesheet-daily',
    //loadChildren: "./time-timesheet-daily/time-timesheet-daily.module#TimeTimesheetDailyModule",
    loadChildren: () =>
      import('./time-timesheet-daily/time-timesheet-daily.module').then((m) => m.TimeTimesheetDailyModule),
  },
  {
    path: 'registerleave',
    //loadChildren: "./overtime/overtime.module#OvertimeModule",
    loadChildren: () => import('./register-leave/register-leave.module').then((m) => m.RegisterleaveModule),
  },
  {
    path: 'overtime',
    //loadChildren: "./overtime/overtime.module#OvertimeModule",
    loadChildren: () => import('./overtime/overtime.module').then((m) => m.OvertimeModule),
  },
  {
    path: 'timesheetsummary',
    //loadChildren: "./overtime/overtime.module#OvertimeModule",
    loadChildren: () => import('./timesheet-summary/timesheet-summary.module').then((m) => m.TimesheetSummaryModule),
  },
  {
    path: 'entilement',
    //loadChildren: "./overtime/overtime.module#OvertimeModule",
    loadChildren: () => import('./entilement/entilement.module').then((m) => m.EntitlementModule),
  },
  {
    path: 'takeleave',
    //loadChildren: "./takeleave/takeleave.module#TakeLeaveModule",
    loadChildren: () => import('./takeleave/takeleave.module').then((m) => m.TakeLeaveModule),
  },
  {
    path: 'declareleave',
    //loadChildren: "./declareleave/declareleave.module#DeclareleaveModule",
    loadChildren: () => import('./declareleave/declareleave.module').then((m) => m.DeclareleaveModule),
  },
  {
    path: 'timeexplanation',
    //loadChildren: "./declareleave/declareleave.module#DeclareleaveModule",
    loadChildren: () => import('./time-explanation/time-explanation.module').then((m) => m.TimeExplanationModule),
  },
  {
    path: 'declaresunper',
    //loadChildren: "./overtime/overtime.module#OvertimeModule",
    loadChildren: () => import('./declaresunper/declaresunper.module').then((m) => m.DeclaresunperModule),
  },
  {
    path: 'time-import',
    //loadChildren: "./declareleave/declareleave.module#DeclareleaveModule",
    loadChildren: () => import('./time-import/time-import.module').then((m) => m.TimeImportModule),
  },
  {
    path: 'atotherlist',
    loadChildren: () => import('./atotherlist/atotherlist.module').then((m) => m.AtotherlistModule),
  },
];
