export interface IThemeBlog {
  id: number;
  name?: string;
  imgUrl?: string;
  color?: string;
  isActive: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
