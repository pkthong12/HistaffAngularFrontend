export interface ITenantGroup {
  id: number;
  name: string;
  code?: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
