export interface IAtRegisterOff {
  id: number;
  employeeId: number;
  dateStart: Date;
  dateEnd: Date;
  timeStart?: Date;
  timeEnd?: Date;
  workingDay?: Date;
  timeLate?: number;
  timeEarly?: number;
  timetypeId?: number;
  note?: string;
  typeId: number;
  statusId: number;
  approveId?: number;
  approveName?: string;
  approvePos?: string;
  approveDay?: Date;
  approveNote?: string;
  isActive: boolean;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
