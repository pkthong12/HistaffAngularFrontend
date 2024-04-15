export interface IAtTimeType {
  id: number;
  code: string;
  name: string;
  morningId: number;
  afternoonId: number;
  isOff?: number;
  isFullday?: boolean;
  orders: number;
  note?: string;
  isActive: boolean;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
