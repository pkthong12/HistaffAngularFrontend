export interface IAtNotification {
  id: number;
  type: number;
  action: number;
  notifiId: number;
  empCreateId: number;
  fmcToken: string;
  isRead: boolean;
  tenantId: number;
  title: string;
  empNotifyId: number;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
