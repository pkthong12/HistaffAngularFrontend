export interface IPaKpiGroup {
  id: number;
  name: string;
  status?: number;
  isActive: boolean;
  orders: number;
  note?: string;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
