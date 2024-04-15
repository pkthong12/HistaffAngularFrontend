export interface IPaElementGroup {
  id: number;
  code: string;
  name: string;
  orders: number;
  isActive: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
