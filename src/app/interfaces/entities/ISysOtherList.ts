export interface ISysOtherList {
  id: number;
  code: string;
  name: string;
  typeId?: number;
  orders?: number;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
  note?: string;
}
