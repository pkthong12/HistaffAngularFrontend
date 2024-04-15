import { Routes } from '@angular/router';

export const PayrollListRoutes: Routes = [
  {
    path: 'salaryelement',
    //loadChildren: "./salaryelement/salaryelement.module#SalaryElementModule",
    loadChildren: () => import('./salaryelement/salaryelement.module').then((m) => m.SalaryElementModule),
  },
  {
    path: 'salarystructure',
    //loadChildren: "./salarystructure/salarystructure.module#SalaryStructureModule",
    loadChildren: () => import('./salarystructure/salarystructure.module').then((m) => m.SalaryStructureModule),
  },
  {
    path: 'kpigroup',
    //loadChildren: "./kpigroup/kpigroup.module#KpiGroupModule",
    loadChildren: () => import('./kpigroup/kpigroup.module').then((m) => m.KpiGroupModule),
  },
  {
    path: 'kpitarget',
    //loadChildren:       "./kpitarget/kpitarget.module#KpiTargetModule",

    loadChildren: () => import('./kpitarget/kpitarget.module').then((m) => m.KpiTargetModule),
  },
  {
    path: 'salarytype',
    loadChildren: () =>
      import('./salarytype/salarytype.module').then((m) => m.SalaryTypeModule),
  },
  {
    path: 'listmachine',
    //loadChildren: "./listmachine/listmachine.module#ListmachineModule",
    loadChildren: () => import('./listmachine/listmachine.module').then((m) => m.ListmachineModule),

    //loadChildren: () => import('./kpitarget/kpitarget.module').then((m) => m.KpiTargetModule),
  },
  {
    path: 'listmachine',
    //loadChildren: "./listmachine/listmachine.module#ListmachineModule",
    loadChildren: () => import('./listmachine/listmachine.module').then((m) => m.ListmachineModule),
  },
  {
    path: 'listfund',
    loadChildren: () => import('./listfund/listfund.module').then((m) => m.ListfundModule),
  },
  {
    path: 'listfundsource',
    loadChildren: () => import('./list-fund-source/list-fund-source.module').then((m) => m.ListFundSourceModule),
  },
  {
    path: 'listproduct',
    //loadChildren: "./listproduct/listproduct.module#ListProductModule",
    loadChildren: () => import('./listproduct/listproduct.module').then((m) => m.ListProductModule),
  },
  {
    path:'phaseadvance',
    loadChildren:()=>import('./phaseadvance/phaseadvance.module').then((m)=>m.PhaseAdvanceModule),
  },
  {
    path:'periodtax',
    loadChildren:()=>import('./periodtax/periodtax.module').then((m)=>m.PeriodTaxModule),
  },
  {
    path:'listsalary',
    loadChildren:()=>import('./listsalary/listsalary.module').then((m)=>m.ListSalaryModule),
  },
  {
    path: 'listsalaries',
    loadChildren:()=>import('./list-salaries/list-salaries.module').then((m)=>m.ListSalariesModule)
  }
];
