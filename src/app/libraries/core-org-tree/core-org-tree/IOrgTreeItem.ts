import { IRecursiveServiceItem } from "../../services/recursive.service";

// According to AuthService data.orgIds array item object
export interface IOrgTreeLinerItem {
    id: number,
    name: string,
    parentId: number,
    code: string,
    status: string,
    shortName: string,
    nameEn: string,
    active?: boolean,
    selected?: boolean,
    checked?: boolean,
    expand?: boolean,
    protected: boolean,
    masterPositions: any[],
}

export interface IOrgTreeItem extends IOrgTreeLinerItem, IRecursiveServiceItem {
}