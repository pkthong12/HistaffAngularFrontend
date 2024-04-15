export interface IInsChange {
  id: number;
  employeeId?: number;
  bhxhNo?: string;
  bhxhDate?: Date;
  bhxhPlace?: string;
  bhxhStatusId?: number;
  bhxhNote?: string;
  bhytNo?: string;
  bhytEffectDate?: Date;
  bhytExpireDate?: Date;
  placeRegisId?: number;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
