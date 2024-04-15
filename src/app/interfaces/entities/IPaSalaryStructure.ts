export interface IPaSalaryStructure {
  id: number;
  salaryTypeId: number;
  elementId: number;
  isVisible?: boolean;
  isCalculate?: boolean;
  isImport?: boolean;
  isSum?: boolean;
  isChange?: boolean;
  orders?: number;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
