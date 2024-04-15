export interface IAtWorkSign {
  id: number;
  employeeId: number;
  periodId: number;
  workingday: Date;
  shiftId?: number;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
