export interface IPaKpiSalaryDetail {
  id: number;
  periodId?: number;
  employeeId: number;
  kpiTargetId: number;
  realValue?: number;
  startValue?: number;
  equalValue?: number;
  kpiSalary?: number;
  isPaySalary?: boolean;
  note?: string;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
