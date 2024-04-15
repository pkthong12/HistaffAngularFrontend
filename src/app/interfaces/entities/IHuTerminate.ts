export interface IHuTerminate {
  id: number;
  employeeId: number;
  effectDate?: Date;
  sendDate?: Date;
  lastDate?: Date;
  terReason?: string;
  signId?: number;
  signerName?: string;
  signerPosition?: string;
  signDate?: Date;
  statusId: number;
  decisionNo: string;
  amountViolations?: number;
  trainingCosts?: number;
  otherCompensation?: number;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
  reasonId?: number;
}
