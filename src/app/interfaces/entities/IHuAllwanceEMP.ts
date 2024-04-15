export interface IHuAllwanceEMP {
  id: number;
  employeeId: number;
  allowanceId?: number;
  monney?: number;
  dateStart?: Date;
  dateEnd?: Date;
  isActive: boolean;
  note?: string;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
