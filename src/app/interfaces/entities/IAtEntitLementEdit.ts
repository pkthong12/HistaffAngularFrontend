export interface IAtEntitLementEdit {
  id: number;
  employeeId?: number;
  year: number;
  month: number;
  numberChange: number;
  note?: string;
  code?: string;
  codeRef?: string;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
