export interface IHuJob {
  id: number;
  code: string;
  nameVn: string;
  nameEn?: string;
  actflg?: string;
  request?: string;
  purpose?: string;
  note?: string;
  createdDate?: Date;
  createdBy?: string;
  createdLog?: string;
  modifiedBy?: string;
  modifiedDate?: Date;
  modifiedLog?: string;
  phanLoaiId?: number;
  jobBandId?: number;
  jobFamilyId?: number;
}
