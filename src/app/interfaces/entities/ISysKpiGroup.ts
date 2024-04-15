export interface ISysKpiGroup {
  id: number;
  name: string;
  note?: string;
  orders: number;
  isActive: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
