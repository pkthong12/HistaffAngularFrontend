export interface IPaAdvance {
  id: number;
  employeeId: number;
  year: number;
  periodId: number;
  money: number;
  advanceDate?: Date;
  signId?: number;
  signerName?: string;
  signerPosition?: string;
  signDate?: Date;
  note?: string;
  statusId: number;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
