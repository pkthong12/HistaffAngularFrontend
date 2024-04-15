export interface IHuFamilyEdit {
  id: number;
  employeeId?: number;
  relationshipId?: number;
  name?: string;
  no?: string;
  taxNo?: string;
  familyNo?: string;
  familyName?: string;
  address?: string;
  birth?: Date;
  dateStart?: Date;
  dateEnd?: Date;
  employeeCode?: string;
  status?: number;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
