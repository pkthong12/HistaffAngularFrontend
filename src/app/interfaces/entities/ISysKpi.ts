export interface ISysKpi {
  id: number;
  code: string;
  name: string;
  kpiGroupId: number;
  unit?: string;
  isRealValue: boolean;
  isPaySalary: boolean;
  isImportKpi: boolean;
  isSystem?: boolean;
  isActive: boolean;
  orders: number;
  note?: string;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
