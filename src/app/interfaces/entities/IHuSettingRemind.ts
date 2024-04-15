export interface IHuSettingRemind {
  id: number;
  code?: string;
  name?: string;
  day?: number;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
