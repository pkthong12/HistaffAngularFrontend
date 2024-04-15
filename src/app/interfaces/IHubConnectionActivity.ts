import { EnumSignalRType } from "../enum/EnumSignalRType";

export interface IHubConnectionActivity {
    sid: string;
    username: string;
    avatar: string;
    signalType: EnumSignalRType;
    message: string;
    data: any;
    loginTime: number;
}