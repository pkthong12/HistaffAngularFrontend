export interface IAtSymbol {
  id: number;
  code: string;
  name: string;
  colName?: string;
  note?: string;
  isActive: boolean;
  isOff?: boolean;
  isCal?: boolean;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
