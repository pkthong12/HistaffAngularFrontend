export interface INavigatorItem {
    id: number;
    code: string;
    sysFunction?: number;
    parent?: number;
    orderNumber?: number;
    url?: string;
    iconFontFamily?: string;
    iconClass?: string;
    sysMenuServiceMethod?: string;
    pictureBase64?: string;
    pictureUri?: string;
    tree$Children: INavigatorItem[];
    tree$Active?: boolean;
    tree$Expanded?: boolean;
    tree$Highlighted?: boolean;
    tree$Tier?: number;
    tree$Path?: string;
    path?: string;
    level?: number;
    tree$Selected : boolean;
    tree$Parent : number;
    protected: boolean;
}