export interface IAtSalaryPeriod {
  id: number;
  name: string;
  year: number;
  dateStart: Date;
  dateEnd: Date;
  standardWorking: number;
  note?: string;
  isActive: boolean;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
