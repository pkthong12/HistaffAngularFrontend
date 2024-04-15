import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { EnumFormBaseContolType } from "../core-form/core-form/enum-interfaces";
import { EnumCoreTablePipeType } from "../core-table/EnumCoreTablePipeType";
import { EnumCoreFormControlSeekerSourceType } from "../core-form-control-seeker/EnumCoreFormControlSeekerSourceType";
import { BehaviorSubject } from "rxjs";
import { ICoreDropdownOption } from "../core-dropdown/core-dropdown/core-dropdown.component";
import { ICoreChecklistOption } from "../core-checklist/core-checklist/core-checklist.component";
import { IFilterOperator, IInOperator } from "src/app/interfaces/IQueryListRequest";
import { api } from "src/app/constants/api/apiDefinitions";
import { ICoreDatePickerRange } from "../core-date-picker/core-date-picker/core-date-picker.component";

// This is a simplied version of IFormBaseControl
export interface ICoreParamControl {

    /* COMPARING || FITERING || IN */
    name: string;
    ngModel: any;
    ngModelChange: (ngModelName: string, value: any) => void;
    filterOperator?: IFilterOperator,
    inOperator?: IInOperator,
    /***/

    /* TO RENDER CONTROL */
    flexSize: number;
    controlType: EnumFormBaseContolType,
    label: EnumTranslateKey,
    type?: string,
    value?: any,
    step?: string, // when type: 'number' and you desire decimal => step: '.01'
    pipe?: EnumCoreTablePipeType, // shared pipe from CoreTable
    /* when using almost all controls */
    seekerSourceType?: EnumCoreFormControlSeekerSourceType,
    /* when using CoreEmployeeSeeker */
    boundFrom?: string;
    shownFrom?: string;
    dropdownOptions$?: BehaviorSubject<ICoreDropdownOption[]>; // WHEN USING CoreDropdownComponent
    checklistOptions$?: BehaviorSubject<ICoreChecklistOption[]>; // WHEN USING CoreChecklistComponent
    hidden?: boolean;

    /* when using CoreDatePicker */
    rangeLimit?: ICoreDatePickerRange;
    
    getByIdObject$?: BehaviorSubject<any>;
    getByIdApi?: api;
    disabled?: boolean;
}