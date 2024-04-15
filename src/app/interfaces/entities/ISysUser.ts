export interface ISysUser {
  id: string;
  discriminator: string;
  groupId?: number;
  fullname?: string;
  isAdmin?: boolean;
  avatar?: string;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
  username?: string;
  normalizedusername?: string;
  email?: string;
  normalizedemail?: string;
  emailconfirmed: number;
  passwordhash?: string;
  securitystamp?: string;
  concurrencystamp?: string;
  phonenumber?: string;
  phonenumberconfirmed: boolean;
  twofactorenabled: boolean;
  lockoutend?: Date;
  lockoutenabled: boolean;
  accessfailedcount: number;
}
