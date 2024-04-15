export interface IHuEmployeePapers {
  id: number;
  paperId: number;
  empId?: number;
  dateInput: Date;
  url?: string;
  note?: string;
  statusId: number;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
