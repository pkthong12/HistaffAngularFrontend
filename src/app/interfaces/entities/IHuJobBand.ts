export interface IHuJobBand {
  id: number;
  nameVn: string;
  nameEn?: string;
  levelFrom?: string;
  levelTo?: string;
  status: boolean;
  createdDate?: Date;
  createdBy?: string;
  createdLog?: string;
  modifiedBy?: string;
  modifiedDate?: Date;
  modifiedLog?: string;
  titleGroupId?: number;
  other?: number;
}
