export interface IHuContact {
  id: number;
  employeeId?: number;
  contractNo: string;
  contractTypeId: string;
  startDate?: Date;
  expireDate?: Date;
  signId?: number;
  signerName?: string;
  signerPosition?: string;
  signDate?: Date;
  salBasic: number;
  salPercent: number;
  note?: string;
  statusId: number;
  workingId?: number;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
