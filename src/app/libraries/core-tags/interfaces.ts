import { ICoreButtonVNS } from "../core-button-group-vns/core-button-group-vns/ICoreButtonVNS";

export interface ITag {
    objectId?: string | number; // string for SYS_USER's ID, number for SYS_GROUP's ID.
    id: number; // SYS_ACTION's ID
    text: string; // CODE
    enabled?: boolean;
    actionButton: ICoreButtonVNS;
}