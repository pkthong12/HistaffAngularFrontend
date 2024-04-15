export interface IHuAnswerUser {
  id: number;
  answerId: number;
  empId: number;
  isActive?: boolean;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
