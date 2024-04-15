export interface IHuSalaryRank {
  id: number;
  code: string;
  name: string;
  orders?: number;
  levelStart?: number;
  salaryScaleId?: number;
  isActive?: boolean;
  note?: string;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
