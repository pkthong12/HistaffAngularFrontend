export interface IHuCommend {
  id: number;
  tenantId: number;
  effectDate: Date;
  no: string;
  signDate: Date;
  signId?: number;
  signerName?: string;
  signerPosition?: string;
  orgId?: number;
  commendObjId?: number;
  sourceCostId?: number;
  commendType?: string;
  reason?: string;
  statusId?: number;
  money?: number;
  isTax: boolean;
  periodId?: number;
  year?: number;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
