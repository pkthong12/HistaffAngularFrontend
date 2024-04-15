export interface IHuBankBranch {
  id: number;
  bankId: number;
  code: string;
  name: string;
  note?: string;
  isActive?: boolean;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
