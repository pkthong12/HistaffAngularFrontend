export interface ITmpInsChange {
  id: number;
  refCode?: string;
  code?: string;
  employeeId?: number;
  typeName?: string;
  changeTypeId?: number;
  changeMonth: Date;
  salaryOld: number;
  salaryNew: number;
  isBhxh?: number;
  isBhyt?: number;
  isBhtn?: number;
  isBnn?: number;
}
