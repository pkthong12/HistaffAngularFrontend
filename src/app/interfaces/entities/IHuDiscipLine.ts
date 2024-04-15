export interface IHuDiscipLine {
  id: number;
  tenantId: number;
  employeeId?: number;
  orgId?: number;
  positionId?: number;
  effectDate: Date;
  no: string;
  signDate: Date;
  signId?: number;
  signerName?: string;
  signerPosition?: string;
  statusId: number;
  disciplineObjId: number;
  disciplineType?: string;
  reason?: string;
  money: number;
  isSalary: boolean;
  year: number;
  periodId: number;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
