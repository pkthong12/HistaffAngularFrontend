import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";

export interface IWarningItem {
    id: number;
    label: EnumTranslateKey;
    warningOn: EnumTranslateKey;
    unit: EnumTranslateKey;
    value: number;
    otherListCode: string;
    isActive: boolean;
    isError? : boolean
    errorMessage: EnumTranslateKey
}