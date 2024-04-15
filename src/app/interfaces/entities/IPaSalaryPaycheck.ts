export interface IPaSalaryPaycheck {
  id: number;
  salaryTypeId: number;
  elementId: number;
  name?: string;
  orders?: number;
  isVisible: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
