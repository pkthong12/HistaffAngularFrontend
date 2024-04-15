export interface IAtSalaryPeriodDTL {
  id: number;
  periodId: number;
  orgId?: number;
  empId?: number;
  workingStandard: number;
  standardTime?: number;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
