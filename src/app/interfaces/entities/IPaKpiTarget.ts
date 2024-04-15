export interface IPaKpiTarget {
  id: number;
  code: string;
  name: string;
  kpiGroupId: number;
  unit?: string;
  colId?: number;
  colName?: string;
  maxValue?: number;
  isRealValue?: boolean;
  isPaySalary?: boolean;
  isImportKpi?: boolean;
  isActive: boolean;
  isSystem?: boolean;
  typeId?: number;
  orders: number;
  note?: string;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
