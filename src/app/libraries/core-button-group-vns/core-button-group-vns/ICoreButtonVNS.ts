import { EnumIconClass } from "src/app/enum/EnumIconClass";
import { EnumCoreButtonVNSCode } from "./EnumCoreButtonVNSCode";
import { EnumStyleButtonClass } from "src/app/enum/EnumStyleButtonClass";


export interface ICoreButtonVNS {
    code: EnumCoreButtonVNSCode;
    iconClass?: EnumIconClass;
    disabled?: boolean;
    sysFunction?: number;
    caption : string;
    styleClass? : EnumStyleButtonClass;
    hidden? : boolean;
    isHeader? : boolean;
    isActive?: boolean;
}