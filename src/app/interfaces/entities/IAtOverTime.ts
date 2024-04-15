export interface IAtOverTime {
  id: number;
  employeeId: number;
  periodId?: number;
  workingDay?: Date;
  timeStart?: Date;
  timeEnd?: Date;
  statusId?: number;
  isActive?: boolean;
  note?: string;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
