export interface ISysPosition {
  id: number;
  groupId: number;
  areaId: number;
  code: string;
  name: string;
  note?: string;
  jobDesc?: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
