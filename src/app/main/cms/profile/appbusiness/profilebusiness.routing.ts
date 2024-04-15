import { Routes } from '@angular/router';
import { TenantPermisstionGuard } from 'src/app/common/auth.guard';

export const ProfileBusinessRoutes: Routes = [
  {
    path: '',
    redirectTo: '/cms/profile/business/inschange',
    pathMatch: 'full',
  },
  {
    path: 'staffprofile',
    loadChildren: () => import('./staffprofile/staffprofile.module').then((m) => m.StaffProfileModule),
  },
  {
    path: 'contractinfor',
    loadChildren: () => import('./contractinfor/contractinfor.module').then((m) => m.ContractInforModule),
  },
  {
    path: 'contractappendix',
    loadChildren: () => import('./contractappendix/contractappendix.module').then((m) => m.ContractAppendixModule),
  },
  {
    path: 'family',
    loadChildren: () => import('./family/family.module').then((m) => m.FamilyModule),
  },
  {
    path: 'working-before',
    loadChildren: () => import('./working-before/working-before.module').then((m) => m.WorkingBeforeModule),
  },
  {
    path: 'wage',
    loadChildren: () => import('./wage/wage.module').then((m) => m.WageModule),
  },
  {
    path: 'decision',
    loadChildren: () => import('./decision/decision.module').then((m) => m.DecisionModule),
  },
  {
    path: 'commend',
    loadChildren: () => import('./commend/commend.module').then((m) => m.CommendModule),
  },
  {
    path: 'discipline',
    loadChildren: () => import('./discipline/discipline.module').then((m) => m.DisciplineModule),
  },
  {
    path: 'leavejob',
    loadChildren: () => import('./leavejob/leavejob.module').then((m) => m.LeaveJobModule),
  },
  // {
  //   path: 'inschange',
  //   loadChildren: () => import('./inschange/inschange.module').then((m) => m.InsChangeModule),
  // },

  {
    path: 'staffprofile-change',
    loadChildren: () =>
      import('./staffprofile-change/staffprofile-change.module').then((m) => m.StaffProfileChangeModule),
  },
  {
    path: 'education-change',
    loadChildren: () =>
      import('./education-change/education-change.module').then((m) => m.EducationChangeModule),
  },
  {
    path: 'candidatescancv',
    loadChildren: () => import('./candidatescancv/candidatescancv.module').then((m) => m.CandidatescancvModule),
  },
  {
    path: 'contractinfor',
    loadChildren: () => import('./contractinfor/contractinfor.module').then((m) => m.ContractInforModule),
  },
  {
    path: 'decision',
    loadChildren: () => import('./decision/decision.module').then((m) => m.DecisionModule),
  },
  {
    path: 'commend',
    loadChildren: () => import('./commend/commend.module').then((m) => m.CommendModule),
  },
  {
    path: 'discipline',
    loadChildren: () => import('./discipline/discipline.module').then((m) => m.DisciplineModule),
  },
  {
    path: 'leavejob',
    loadChildren: () => import('./leavejob/leavejob.module').then((m) => m.LeaveJobModule),
  },
  {
    path: 'staffprofile-change',
    loadChildren: () =>
      import('./staffprofile-change/staffprofile-change.module').then((m) => m.StaffProfileChangeModule),
  },
  {
    path: 'family-change',
    loadChildren: () => import('./family-change/family-change.module').then((m) => m.FamilyChangeModule),
  },
  {
    path: 'candidatescancv',
    loadChildren: () => import('./candidatescancv/candidatescancv.module').then((m) => m.CandidatescancvModule),
  },
  {
    path: 'qualification',
    loadChildren: () => import('./qualification/qualification.module').then((m) => m.QualificationModule),
  },
  {
    path: 'ins-type',
    loadChildren: () => import('./ins-type/ins-type.module').then((m) => m.InsTypeModule),
  },
  {
    path: 'ins-wherehealth',
    loadChildren: () => import('./ins-wherehealth/ins-wherehealth.module').then((m) => m.InsWherehealthModule),
  },
  {
    path: 'ins-specifiedobject',
    loadChildren: () =>
      import('./ins-specifiedobjects/ins-specifiedobjects.module').then((m) => m.SpecifiedObjectsModule),
  },
  // {
  //   path: 'tr-plan',
  //   loadChildren: () => import('./trplan/trplan.module').then((m) => m.TrplanModule),
  // },
  {
    path: 'evaluation-com',
    loadChildren: () => import('./evaluation-com/evaluation-com.module').then((m) => m.EvaluationComModule),
  },
  {
    path: 'dynamic-report',
    loadChildren: () => import('./dynamic-report/dynamic-report.module').then((m) => m.DynamicReportModule),
  },
];
