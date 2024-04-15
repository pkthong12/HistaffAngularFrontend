export interface IPaKpiFormula {
  id: number;
  colName: string;
  formula?: string;
  formulaName?: string;
  isActive: boolean;
  orders: number;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
