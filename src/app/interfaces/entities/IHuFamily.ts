export interface IHuFamily {
  id: number;
  tenantId: number;
  relationshipId?: number;
  employeeId: number;
  name?: string;
  no?: string;
  taxNo?: string;
  familyNo?: string;
  familyName?: string;
  address?: string;
  birth?: Date;
  dateStart?: Date;
  dateEnd?: Date;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
