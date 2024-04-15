export interface IHuOrganization {
  id: number;
  tenantId: number;
  code: string;
  name: string;
  parentId?: number;
  mngId?: number;
  foundationDate?: Date;
  dissolveDate?: Date;
  phone?: string;
  fax?: string;
  address?: string;
  businessNumber?: string;
  businessDate?: Date;
  taxCode?: string;
  note?: string;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
  status?: string;
  shortName?: string;
  nameEn?: string;
  uyBan?: number;
  levelOrg?: number;
  groupproject?: number;
}
