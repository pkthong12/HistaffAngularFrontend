import { BehaviorSubject, Subject } from "rxjs";
import { IOrgTreeLinerItem } from "../libraries/core-org-tree/core-org-tree/IOrgTreeItem";

export interface IPermissionAction {

    // THE CORE TWO
    functionId: number;
    allowedActionIds: number[];

    // THE OTHERS
    moduleCode: string;
    functionCode: string;
    functionUrl: string;
    allowedActionCodes: string[];
}

export interface IAuthData {
    avatar: string;
    employeeId?: number;
    fullName: string;
    id: string;
    isAdmin: boolean;
    isRoot: boolean;
    isLook: boolean;
    isFirstLogin: any;
    permissionParams: any;
    refreshToken: any;
    tenantId: number;
    token: string;
    userName: string;
    loginTime: number;
    orgIds: IOrgTreeLinerItem[];
    orgPermissionChangeFlag$: BehaviorSubject<boolean>;
    permissionActions: IPermissionAction[];
}