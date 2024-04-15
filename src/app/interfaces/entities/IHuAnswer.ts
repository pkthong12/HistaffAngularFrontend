export interface IHuAnswer {
  id: number;
  answer?: string;
  questionId: number;
  isActive?: boolean;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
