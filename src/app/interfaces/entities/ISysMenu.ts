export interface ISysMenu {
  id: number;
  code: string;
  orderNumber?: number;
  iconFontFamily?: string;
  iconClass?: string;
  sysMenuServiceMethod?: string;
  url?: string;
  parent?: number;
  sysFunction?: number;
}
