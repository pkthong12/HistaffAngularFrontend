import { FormGroup, ValidatorFn } from "@angular/forms";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { EnumCoreFormControlSeekerSourceType } from "../../core-form-control-seeker/EnumCoreFormControlSeekerSourceType";
import { ICoreDropdownOption } from "../../core-dropdown/core-dropdown/core-dropdown.component";
import { BehaviorSubject, Subject } from "rxjs";
import { EnumCoreFileUploaderType } from "../../core-file-uploader/core-file-uploader/core-file-uploader.component";
import { EnumIconClass } from "src/app/enum/EnumIconClass";
import { ICoreChecklistOption } from "../../core-checklist/core-checklist/core-checklist.component";
import { ICoreListOption } from "../../core-list/core-list/core-list.component";
import { EnumCoreTablePipeType } from "../../core-table/EnumCoreTablePipeType";
import { api } from "src/app/constants/api/apiDefinitions";
import { ICoreTableColumnItem } from "../../core-table/core-table.component";
import { ICoreRadioOption } from "../../core-radio-group/core-radio-group/core-radio-group.component";
import { ICoreDatePickerRange } from "../../core-date-picker/core-date-picker/core-date-picker.component";
import { ICorePageListApiDefinition } from "../../core-page-list/core-page-list.component";

export enum EnumFormBaseContolType {
  HIDDEN = "HIDDEN",
  TEXTBOX = "TEXTBOX",
  TEXTAREA = "TEXTAREA",
  DROPDOWN = "DROPDOWN",
  CHECKLIST = "CHECKLIST",
  LIST = "LIST",
  DATEPICKER = "DATEPICKER",
  SEEKER = "SEEKER",
  CHECKBOX = "CHECKBOX",
  FILEUPLOADER = "FILEUPLOADER",
  ATTACHMENT = "ATTACHMENT",
  GRIDBUFFER = "GRIDBUFFER",
  ORGTREECHECK = "ORGTREECHECK",
  RADIOGROUP = "RADIOGROUP",
  MCC = "MCC",
  MONTHSELECTOR = "MONTHSELECTOR",
  CURRENCY = "CURRENCY"
}

export interface IFormBaseDropdownOption {
  key: string,
  value: string,
}

export interface IValidator {
  name: string, // must equal the error key
  validator: ValidatorFn,
  errorMessage: EnumTranslateKey,
}

export interface ICoreFormControlSeekerExtraBindingModel {
  takeFrom: string;
  bindTo: string;
}

export interface ICoreFormSection {
  caption?: EnumTranslateKey,
  iconClass?: EnumIconClass,
  addModeOnly?: boolean; // Some section for specific edit component need not to create and render particular section. If needed, set addModeOnly to true
  updateModeOnly?: boolean; // Some section for specific edit component need not to create and render particular section. If needed, set updateModeOnly to true
  hidden?: boolean; // Sometimes we need some section not to be initially rendered
  rows: IFormBaseControl[][];
}

export interface IFormBaseControl {
  flexSize: number;
  controlType: EnumFormBaseContolType,
  field: string,
  label: EnumTranslateKey,
  value: any,
  options?: IFormBaseDropdownOption[],
  readonly?: boolean,
  hidden?: boolean,
  disabled?: boolean,
  type?: string,
  step?: string, // when type: 'number' and you desire decimal => step: '.01'
  pipe?: EnumCoreTablePipeType, // shared pipe from CoreTable
  tooltip?: EnumTranslateKey;
  hint?: EnumTranslateKey;

  textareaRows?: number, // WHEN USING standard TextArea

  seekerSourceType?: EnumCoreFormControlSeekerSourceType,

  /* when using SEEKER from grid*/
  preDefinedOuterParam$?: BehaviorSubject<any>;

  /* when using almost all controls */
  getByIdObject$?: BehaviorSubject<any>;
  getByIdApi?: api;

  /* when using CoreEmployeeSeeker */
  boundFrom?: string;
  shownFrom?: string; // When using MCC too
  alsoBindTo?: ICoreFormControlSeekerExtraBindingModel[];

  dropdownOptions$?: BehaviorSubject<ICoreDropdownOption[]>; // WHEN USING CoreDropdownComponent

  listOptions?: ICoreListOption[]; // WHEN USING CoreListComponent

  multiMode?: boolean; // when using SEEKER with grid (multiMode)
  objectList$?: BehaviorSubject<any[]>; // when using SEEKER with grid (multiMode)
  getObjectListFrom?: string; // when using SEEKER with grid (multiMode)

  radioGroupOptions$?: BehaviorSubject<ICoreRadioOption[]>; // WHEN USING CoreRadioGroupComponent
  
  checklistOptions$?: BehaviorSubject<ICoreChecklistOption[]>; // WHEN USING CoreChecklistComponent

  uploadFileType?: EnumCoreFileUploaderType; // WHEN USING CoreFileUploaderComponent
  fileDataControlName?: string; // WHEN USING CoreFileUploaderComponent
  fileNameControlName?: string; // WHEN USING CoreFileUploaderComponent
  fileTypeControlName?: string; // WHEN USING CoreFileUploaderComponent
  verticalMode?: boolean; // WHEN USING CoreFileUploaderComponent

  assignTo?: string; // WHEN USING CoreAttchmentComponent <==== NEW
  valueToShow?: string; // WHEN USING CoreAttchmentComponent <==== NEW

  gridBufferFormSections?: ICoreFormSection[]; // WHEN USING CoreGridBufferComponent
  gridBufferTableColumns?: ICoreTableColumnItem[]; // WHEN USING CoreGridBufferComponent
  onBufferFormCreated?: (form: FormGroup) => void; // WHEN USING CoreGridBufferComponent. USE CASE: this.formBuffer = form; this.formBuffer.get(<SOME_FIELD>)?.valueChanges...

  columns?: ICoreTableColumnItem[]; // WHEN USING MCC
  apiDefinition?: ICorePageListApiDefinition; // WHEN USING MCC
  selectedRow$?: BehaviorSubject<any>; // WHEN USING MCC
  outerParam$?: BehaviorSubject<any>; // WHEN USING MCC

  /* when using CoreDatePicker */
  rangeLimit?: ICoreDatePickerRange;

  //mccData?: IMccInput,
  validators?: IValidator[],
  //onMccChanged?: (args: any) => void

  focus$?: BehaviorSubject<any>;
  blur$?: BehaviorSubject<any>;

}