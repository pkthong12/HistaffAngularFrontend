export interface IInsChange {
  id: number;
  tenantId: number;
  employeeId?: number;
  changeTypeId: number;
  changeMonth: Date;
  salaryOld: number;
  salaryNew: number;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
  note?: string;
  isBhxh?: boolean;
  isBhyt?: boolean;
  isBhtn?: boolean;
  isBnn?: boolean;
}
