export interface IAtTimeLateEarly {
  id: number;
  dateStart?: Date;
  dateEnd?: Date;
  timeLate?: number;
  timeEarly?: number;
  employeeId?: number;
  statusId: number;
  note?: string;
  isActive: boolean;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
