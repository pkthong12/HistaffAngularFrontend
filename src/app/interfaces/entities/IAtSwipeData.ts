export interface IAtSwipeData {
  id: number;
  empId: number;
  itimeId?: number;
  timePoint: Date;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
  latitude?: string;
  longitude?: string;
  model?: string;
  image?: string;
  mac?: string;
  operatingSystem?: string;
  operatingVersion?: string;
  wifiIp?: string;
  bssId?: string;
  isPortal?: boolean;
}
