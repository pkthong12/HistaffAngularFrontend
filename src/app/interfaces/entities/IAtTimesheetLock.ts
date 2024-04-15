export interface IAtTimesheetLock {
  id: number;
  periodId: number;
  orgId: number;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
