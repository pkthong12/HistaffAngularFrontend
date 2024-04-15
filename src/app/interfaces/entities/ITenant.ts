export interface ITenant {
  id: number;
  code: string;
  tenancyName: string;
  ownerName: string;
  address?: string;
  phone?: string;
  email?: string;
  logo?: string;
  connectionString?: string;
  dateExpire: Date;
  qrcode?: string;
  userRef?: string;
  codeEmp?: string;
  areaId?: number;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
