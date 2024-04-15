export interface IHuSalaryLevel {
  id: number;
  code: string;
  name: string;
  orders?: number;
  salaryRankId?: number;
  monney?: number;
  coefficient?: number;
  isActive?: boolean;
  note?: string;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
  salaryScaleId?: number;
  performBonus?: number;
  otherBonus?: number;
  totalSalary?: number;
}
