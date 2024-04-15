import {
  Component,
  ViewEncapsulation,
} from "@angular/core";
import { BehaviorSubject, Subscription, debounceTime, distinctUntilChanged } from "rxjs";
import { setCulture } from "@syncfusion/ej2-base";
import {
  FilterService,
  VirtualScrollService,
} from "@syncfusion/ej2-angular-grids";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseEditComponent } from "src/app/libraries/base-edit/base-edit/base-edit.component";
import { api } from "src/app/constants/api/apiDefinitions";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { ICoreDropdownOption } from "src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component";
import { ICoreFormSection, EnumFormBaseContolType } from "src/app/libraries/core-form/core-form/enum-interfaces";
import { ICorePageEditCRUD } from "src/app/libraries/core-page-edit/core-page-edit.component";
import { DialogService } from "src/app/services/dialog.service";
import { ICoreChecklistOption } from "src/app/libraries/core-checklist/core-checklist/core-checklist.component";
import { IFormatedResponse } from "src/app/interfaces/IFormatedResponse";
import { AppService } from "src/app/services/app.service";
setCulture("en");

@Component({
  selector: "app-job-band-edit",
  templateUrl: "./job-band-edit.component.html",
  styleUrls: ["./job-band-edit.component.scss"],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class JobBandEditComponent extends BaseEditComponent {


  loading: boolean = false;
  override entityTable = "HU_JOB_BAND";
  checklistOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
  groupJobBandOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;
  subsctiptions: Subscription[] = [];

  groupJobBandGetByIdObject$ = new BehaviorSubject<any>(null);
  groupJobBandGetByIdApi = api.HU_GROUP_POSITION_READ;

  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_BAND_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text',
              hidden : true
            }
          ],
         
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_BAND_NAMEVN,
              field: 'nameVn',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(1),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },            
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_BAND_NAMEEN,
              field: 'nameEn',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },            
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_BAND_LEVELFROM,
              field: 'levelFrom',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },            
          ],
        ]
      }
    ];
  scaleOptions$: BehaviorSubject<ICoreDropdownOption[]> | undefined;

  constructor(
    public override dialogService: DialogService,
    private appService: AppService // CoreService is DEPRECATED!!!
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_JOB_BAND_EDIT;

    this.crud = {
      c: api.HU_JOB_BAND_CREATE,
      r: api.HU_JOB_BAND_READ,
      u: api.HU_JOB_BAND_UPDATE,
      d: api.HU_JOB_BAND_DELETE,
    };

  }

  ngOnInit(): void {
    this.loading = true;
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}
