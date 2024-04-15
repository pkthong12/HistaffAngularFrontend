export interface ITenantGroupPermission {
  id: number;
  groupId: number;
  functionId: number;
  permissionString?: string;
  applicationId: number;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
  tenantId?: number;
}
