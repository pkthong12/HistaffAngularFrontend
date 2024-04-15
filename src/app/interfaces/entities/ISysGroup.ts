export interface ISysGroup {
  id: number;
  name: string;
  code?: string;
  isAdmin?: boolean;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
