export interface ISysPositionGroup {
  id: number;
  code: string;
  name: string;
  note?: string;
  areaId: number;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
