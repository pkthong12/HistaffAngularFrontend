import { EnumButtonCaptionCode } from "./EnumButtonCaptionCode";

export interface ICoreButton {
    iconClass: string;
    captionCode: EnumButtonCaptionCode;
    disabled?: boolean;
    sysFunction?: number;
}