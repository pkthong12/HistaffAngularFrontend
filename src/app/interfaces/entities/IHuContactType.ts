export interface IHuContactType {
  id: number;
  code: string;
  name: string;
  period?: number;
  dayNotice?: number;
  note?: string;
  isLeave?: boolean;
  typeId?: number;
  isActive?: boolean;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
