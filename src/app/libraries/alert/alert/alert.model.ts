export interface IAlert {
    id: string;
    type?: EnumAlertType;
    message?: string;
    autoClose?: boolean;
    keepAfterRouteChange?: boolean;
    fade?: boolean;
    timeClose?: number;
}

export enum EnumAlertType {
    Success,
    Error,
    Info,
    Warning
}

export class IAlertOptions {
    id?: string;
    autoClose?: boolean;
    keepAfterRouteChange?: boolean;
    timeClose?: number = 3000;
}