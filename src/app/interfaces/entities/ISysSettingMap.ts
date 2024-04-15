export interface ISysSettingMap {
  id: number;
  name?: string;
  address?: string;
  radius?: number;
  lat?: string;
  lng?: string;
  zoom?: number;
  center?: string;
  orgId?: number;
  ip?: string;
  bssid?: string;
  qrcode?: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
