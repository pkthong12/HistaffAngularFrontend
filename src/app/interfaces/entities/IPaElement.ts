export interface IPaElement {
  id: number;
  code: string;
  name: string;
  groupId: number;
  isSystem: boolean;
  isActive: boolean;
  orders: number;
  dataType: number;
  note?: string;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
