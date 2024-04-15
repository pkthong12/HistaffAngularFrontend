export interface ISysPaFormula {
  id: number;
  areaId: number;
  colName: string;
  salaryTypeId: number;
  formula: string;
  formulaName?: string;
  orders?: number;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
