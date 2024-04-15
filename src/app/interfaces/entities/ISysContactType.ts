export interface ISysContactType {
  id: number;
  code: string;
  name: string;
  period?: number;
  dayNotice?: number;
  note?: string;
  isLeave?: boolean;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
