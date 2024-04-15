export interface IAtPeriodStandard{
  id: number;
  year: number;
  periodId: number;
  objectId: number;
  periodStandard: number;
  isActive?: boolean;
  note?: string;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
  employeeId?:number;
}