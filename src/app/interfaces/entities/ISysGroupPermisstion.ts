export interface ISysGroupPermisstion {
  id: number;
  groupId: number;
  functionId: number;
  permissionString?: string;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
