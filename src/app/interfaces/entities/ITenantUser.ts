export interface ITenantUser {
  id: number;
  userName: string;
  isPortal?: boolean;
  isWebapp?: boolean;
  groupId: number;
  userNameRef?: string;
  email?: string;
  fullname?: string;
  employeeCode?: string;
  employeeName?: string;
  avatar?: string;
  isFirstLogin: boolean;
  empId?: number;
  fcmToken?: string;
  refreshToken?: string;
  passwordHash: string;
  salt?: string;
  isLock: boolean;
  del?: boolean;
  deviceId?: number;
  isAdmin: boolean;
  startDate?: Date;
  endDate?: Date;
  testString?: string;
}
