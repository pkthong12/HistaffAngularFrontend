import { Component, Input } from '@angular/core';
import { api } from 'src/app/constants/api/apiDefinitions';
import { ICorePageEditCRUD, ICorePageEditColumnComposition } from 'src/app/libraries/core-page-edit/core-page-edit.component';

import { FormGroup, Validators } from '@angular/forms';
import { EnumFormBaseContolType, ICoreFormSection } from 'src/app/libraries/core-form/core-form/enum-interfaces';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import { DialogService } from 'src/app/services/dialog.service';
import { CoreFormService } from 'src/app/libraries/core-form/core-form.service';

import { BehaviorSubject, Subscription, distinctUntilChanged } from 'rxjs';
import { ICoreDropdownOption } from 'src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component';
import { InsArisingEditService } from './ins-arising-edit.service';
import { EnumCoreFormControlSeekerSourceType } from 'src/app/libraries/core-form-control-seeker/EnumCoreFormControlSeekerSourceType';
import { AppService } from 'src/app/services/app.service';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';

@Component({
  selector: 'app-ins-arising-edit',
  templateUrl: './ins-arising-edit.component.html',
  styleUrls: ['./ins-arising-edit.component.scss']
})
export class InsArisingEditComponent extends BaseEditComponent {
  @Input() selectedIds: number[] = [];

  /* Properties to be passed into core-page-edit */

  override entityTable = "INS_ARISING";

  loading: boolean = false;
  subscriptions: Subscription[] = [];

  insgrouptypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  insgrouptypeGetByIdObject$ = new BehaviorSubject<any>(null);
  insgrouptypeGetByIdApi = api.INS_ARISING_INS_TYPE_READ;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_ID,
              field: 'id',
              value: 0,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'number'
            },
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_ID,
              field: 'ids',
              value: history.state.data,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'string'
            },
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_DECLARE_MONTH,
              field: 'declaredMonth',
              value: null,
              controlType: EnumFormBaseContolType.MONTHSELECTOR,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            }
          ]
        ]
      },
      {
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_INS_GROUP_TYPE,
              field: 'insTypeChooseId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.insgrouptypeGetByIdObject$,
              getByIdApi: this.insgrouptypeGetByIdApi,
              shownFrom: 'name',
              dropdownOptions$: this.insgrouptypeOptions$,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.min(1),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            }
          ]
        ]
      },
      {
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_DECLARE_DATE,
              field: 'declaredDate',
              value: null,
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            }
          ]
        ]
      }
    ];
  constructor(
    public override dialogService: DialogService,
    private InsArisingEditService: InsArisingEditService,
    private coreFormService: CoreFormService,
    private appService: AppService // CoreService is DEPRECATED!!!
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_ARISING_EDIT;

    this.crud = {
      c: api.INS_ARISING_CREATE,
      r: api.INS_ARISING_READ,
      u: api.INS_ARISING_UPDATE,
      d: api.INS_ARISING_DELETE,
    };

  }

  ngOnInit(): void {
    this.loading = true;
    this.subscriptions.push(
      this.appService
      .get(api.INS_ARISING_INS_TYPE_LIST)
      .subscribe((res: any) => {
        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body
          if (body.statusCode === 200 && !!body.innerBody) {
        const options: { value: number | null; text: string; }[] = [];
        options.push({
          value: Number(),
          text: ''
        })
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        })
        this.insgrouptypeOptions$.next(options);
      }}
      })
    ) 
  }
  
  onFormCreated(e: FormGroup): void {
    this.form = e as FormGroup;

    this.subscriptions.push(
      this.form.get('id')?.valueChanges.subscribe(x => {
        if (x) {
          if (x != 0) {
            this.form.get('ids')?.patchValue([x]);
          }
        }
      })!
    )
  }
  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}
