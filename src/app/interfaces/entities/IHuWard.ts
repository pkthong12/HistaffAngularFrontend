export interface IHuWard {
  id: number;
  code: string;
  name: string;
  isActive?: boolean;
  note?: string;
  districtId: number;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
