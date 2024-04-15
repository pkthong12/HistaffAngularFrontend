export interface ISysSalaryType {
  id: number;
  code: string;
  name: string;
  orders?: number;
  isActive?: boolean;
  note?: string;
  areaId: number;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
