export interface IHuFunction {
  id: number;
  name: string;
  nameEn?: string;
  createdDate?: Date;
  createdBy?: string;
  createdLog?: string;
  modifiedBy?: string;
  modifiedDate?: Date;
  modifiedLog?: string;
  parentId?: number;
  jobId?: number;
  functionId?: number;
}
