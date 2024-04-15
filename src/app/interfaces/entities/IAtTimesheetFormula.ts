export interface IAtTimesheetFormula {
  id: number;
  name?: string;
  colName?: string;
  formula?: string;
  formulaName?: string;
  orders: number;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
