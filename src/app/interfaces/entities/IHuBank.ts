export interface IHuBank {
  id: number;
  code: string;
  name: string;
  note?: string;
  order?: number;
  isActive?: boolean;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
