export interface IInsType {
  id: number;
  typeId: number;
  name: string;
  note?: string;
  isActive: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
  status?: number;
}
