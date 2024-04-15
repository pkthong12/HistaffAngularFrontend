export interface IHuSalaryType {
  id: number;
  code: string;
  name: string;
  orders?: number;
  isActive?: boolean;
  note?: string;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
