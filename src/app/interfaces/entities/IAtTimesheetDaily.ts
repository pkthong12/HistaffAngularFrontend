export interface IAtTimesheetDaily {
  id: number;
  employeeId: number;
  periodId: number;
  workingday: Date;
  timetypeId: number;
  otTime?: number;
  otTimeNight?: number;
  isRegisterOff?: boolean;
  isRegisterLateEarly?: boolean;
  isHoliday?: boolean;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
