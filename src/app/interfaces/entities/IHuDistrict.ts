export interface IHuDistrict {
  id: number;
  code: string;
  provinceId: number;
  name: string;
  isActive?: boolean;
  note?: string;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
