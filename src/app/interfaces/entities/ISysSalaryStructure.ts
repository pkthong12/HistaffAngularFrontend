export interface ISysSalaryStructure {
  id: number;
  areaId: number;
  salaryTypeId: number;
  elementId: number;
  isVisible: boolean;
  isCalculate: boolean;
  isImport: boolean;
  orders?: number;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
