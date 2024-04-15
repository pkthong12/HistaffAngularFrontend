export interface IAtTimesheetMachineEdit {
  id: number;
  tenantId?: number;
  periodId?: number;
  employeeId?: number;
  workingday?: Date;
  timePoint1?: string;
  timePoint4?: string;
  isEditIn?: boolean;
  isEditOut?: boolean;
  note?: string;
}
