/*
interface IFormatedResponse {
    messageCode: string;
    errorType: number; // none = 0; catchable = 1; uncatchable = 2
    statusCode: number;
    innerBody: IFunctionPermissionInnerBody;
}
*/

export interface IFunctionPermissionInnerBody {
    userId: string;
    userPermission: IFunctionPermission[];
}

export interface IFunctionPermission {
    functionId: number;
    functionCode: string;
    functionNameCode: string; // constant, for example UI_ACTION_YOUR_CODE...
    groupNameCode: string; // constant, for example UI_ACTION_YOUR_CODE... 
    moduleNameCode: string; // constant, for example UI_ACTION_YOUR_CODE...
    appActions: IAppAction[];
}

export interface IAppAction {
    actionId: number;
    actionCode: string;
    actionNameCode: string; // constant, for example UI_ACTION_YOUR_CODE...
    allowed: boolean;
}



