export interface IPaSalImport {
  id: number;
  employeeId: number;
  elementId: number;
  periodId?: number;
  money: number;
  money1?: string;
  typeSal: number;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
