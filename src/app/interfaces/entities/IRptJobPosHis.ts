export interface IRptJobPosHis {
  id: number;
  parentId?: number;
  nameEn?: string;
  nameVn?: string;
  jobgroup?: string;
  code?: string;
  level1?: number;
  lyFte?: number;
  ytdFte?: number;
  planFte?: number;
  vsLyFte?: number;
  vsPlanFte?: number;
  nodeHasChild?: number;
  order1?: number;
  createdBy?: string;
  createdDate?: Date;
  lyFteV2?: number;
}
