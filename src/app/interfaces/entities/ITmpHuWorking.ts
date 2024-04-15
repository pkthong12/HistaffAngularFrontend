export interface ITmpHuWorking {
  id: number;
  refCode?: string;
  code?: string;
  employeeId?: number;
  posName?: string;
  positionId?: number;
  orgId: number;
  effectDate?: Date;
  expireDate?: Date;
  decisionNo?: string;
  typeName?: string;
  typeId?: number;
  salaryTypeName?: string;
  salaryTypeId?: number;
  salaryLevelId?: number;
  salBasic?: number;
  coefficient?: number;
  salTotal?: number;
  salPercent?: number;
  statusName?: string;
  statusId?: number;
  signDate?: Date;
  signerName?: string;
  signerPosition?: string;
}
