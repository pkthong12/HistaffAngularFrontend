export interface IAtOverTimeConfig {
  id: number;
  hourMin?: number;
  hourMax?: number;
  factorNt?: number;
  factorNn?: number;
  factorNl?: number;
  factorDnt?: number;
  factorDnn?: number;
  factorDnl?: number;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
}
