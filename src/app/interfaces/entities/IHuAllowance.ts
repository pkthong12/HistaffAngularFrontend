export interface IHuAllwance {
  id: number;
  code: string;
  colName?: string;
  name: string;
  typeId?: number;
  isInsurance?: boolean;
  isActive?: boolean;
  note?: string;
  isFullday?: boolean;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
  salaryRankId?: number;
}
