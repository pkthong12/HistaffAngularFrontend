export interface IPaBlogInternal {
  id: number;
  title?: string;
  imgUrl?: string;
  description?: string;
  content?: string;
  themeId?: number;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
