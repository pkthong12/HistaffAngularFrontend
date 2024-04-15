export interface IHuQuestion {
  id: number;
  name?: string;
  expire?: Date;
  isMultiple: boolean;
  isAddAnswer: boolean;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
