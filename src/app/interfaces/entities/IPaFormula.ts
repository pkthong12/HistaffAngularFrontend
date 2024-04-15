export interface IPaFormula {
  id: number;
  colName: string;
  salaryTypeId: number;
  formula: string;
  formulaName?: string;
  orders?: number;
  isDaily?: boolean;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
