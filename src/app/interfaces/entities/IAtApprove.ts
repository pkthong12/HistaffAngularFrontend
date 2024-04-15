export interface IAtApprove {
  id: number;
  registerId: number;
  empResId: number;
  approveId: number;
  approveName?: string;
  approvePos?: string;
  approveDay?: Date;
  approveNote?: string;
  typeId: number;
  isReg: boolean;
  statusId: number;
  isRead: boolean;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
  employeeId?: number;
  timeTypeId: number;
}
