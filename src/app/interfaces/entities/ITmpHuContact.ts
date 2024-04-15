export interface ITmpHuContact {
  id: number;
  refCode?: string;
  code?: string;
  employeeId?: number;
  dateStart?: Date;
  dateEnd?: Date;
  contractNo?: string;
  contractTypeName?: string;
  contractTypeId?: number;
  salBasic?: number;
  salTotal?: number;
  salPercent?: number;
  statusName?: string;
  statusId?: number;
  signDate?: Date;
  signerName?: string;
  signerPosition?: string;
}
