import { EnumIconClass } from "src/app/enum/EnumIconClass";
import { EnumCoreButtonCode } from "./EnumButtonCaptionCode";

export interface ICoreButton {
    code: EnumCoreButtonCode;
    iconClass: EnumIconClass;
    disabled?: boolean;
    sysFunction?: number;
}