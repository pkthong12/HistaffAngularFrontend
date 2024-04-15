import { Routes } from "@angular/router";

export const SystemConfigRoutes: Routes = [
  {
    path: "groupfunction",
    loadChildren: () => import("src/app/main/system/config/GroupFunction/GroupFunction.module").then(m => m.GroupFunctionModule),
  },
  {
    path: "module",
    loadChildren: () => import("src/app/main/system/config/Module/Module.module").then(m => m.ModuleModule),
  },
  {
    path: "function",
    loadChildren: () => import("src/app/main/system/config/Function/Function.module").then(m => m.FunctionModule),
  },
  {
    path: "syspackage",
    loadChildren: () => import("src/app/main/system/config/SysPackage/SysPackage.module").then(m => m.SysPackageModule),
  },
  {
    path: "groupuser",
    loadChildren: () => import("src/app/main/system/config/groupuser/groupuser.module").then(m => m.GroupUserModule),
  },
  {
    path: "user",
    loadChildren: () => import("src/app/main/system/config/user/user.module").then(m => m.UserModule),
  },
  {
    path: "groupuserpermission",
    loadChildren: () => import("src/app/main/system/config/groupuserpermission/groupuserpermission.module").then(m => m.GroupUserPermissionModule),
  },
  {
    path: "userpermission",
    loadChildren: () => import("src/app/main/system/config/userpermission/userpermission.module").then(m => m.UserPermissionModule),
  },
  {
    path: "tenant",
    loadChildren: () => import("src/app/main/system/config/tenant/tenant.module").then(m => m.TenantModule),
  },
  {
    path: "tenantcontract",
    loadChildren: () => import("src/app/main/system/config/tenantcontract/tenantcontract.module").then(m => m.TenantContractModule),
  }
];
