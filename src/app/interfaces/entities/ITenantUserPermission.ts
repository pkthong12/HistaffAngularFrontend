export interface ITenantUserPermission {
  id: number;
  userId?: number;
  functionId: number;
  applicationId: number;
  permissionString?: string;
  funcActionId?: number;
}
