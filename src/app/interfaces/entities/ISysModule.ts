export interface ISysModule {
  id: number;
  applicationId?: number;
  name: string;
  code?: string;
  note?: string;
  orders?: number;
  price: number;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
