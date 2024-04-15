export interface ISysPaElement {
  id: number;
  code: string;
  name: string;
  groupId: number;
  areaId: number;
  isSystem: boolean;
  isActive: boolean;
  orders: number;
  dataType: number;
  note?: string;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
