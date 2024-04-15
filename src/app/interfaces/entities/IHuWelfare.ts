export interface IHuWelfare {
  id: number;
  code: string;
  name: string;
  monney?: number;
  seniority?: number;
  dateStart?: Date;
  dateEnd?: Date;
  isActive?: boolean;
  note?: string;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
