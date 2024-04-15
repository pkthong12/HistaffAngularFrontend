import { Component, OnDestroy, OnInit } from '@angular/core';
import { api } from 'src/app/constants/api/apiDefinitions';
import { ICorePageEditCRUD } from 'src/app/libraries/core-page-edit/core-page-edit.component';

import { FormGroup, Validators } from '@angular/forms';
import { EnumFormBaseContolType, ICoreFormSection } from 'src/app/libraries/core-form/core-form/enum-interfaces';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import { DialogService } from 'src/app/services/dialog.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { BehaviorSubject, Subscription } from 'rxjs';

import { AppService } from 'src/app/services/app.service';
import { ICoreRadioOption } from 'src/app/libraries/core-radio-group/core-radio-group/core-radio-group.component';

@Component({
  selector: "app-survey-edit",
  templateUrl: "./survey-edit.component.html",
  styleUrls: ["./survey-edit.component.scss"],
})
export class SurveyEditComponent extends BaseEditComponent implements OnInit, OnDestroy {

  loading: boolean = false;

  subsctiptions: Subscription[] = [];

  /* #region Properties to be passed into core-page-edit */

  override entityTable = "HU_QUESTION";

  radioOptions$ = new BehaviorSubject<ICoreRadioOption[]>([]);

  captionCode!: EnumTranslateKey;
  //formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        caption: EnumTranslateKey.UI_FORM_SECTION_CAPTION_HU_QUESTION_QUESTION,
        // iconClass: ...,
        rows: [
          [
            // JUST FOR TEST RADIO GROUP
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMMON_EMPTY_STRING,
              field: 'radioValue',
              value: 1000,
              controlType: EnumFormBaseContolType.RADIOGROUP,
              radioGroupOptions$: this.radioOptions$,
              type: 'string',
            }
          ],
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: 0,
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              hidden: true // To hide id field
            },
            {
              flexSize: 8,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_QUESTION_NAME,
              field: 'name',
              type: 'string',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.min(1),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_QUESTION_EXPIRE,
              field: 'expire',
              value: new Date(),
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ],
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_QUESTION_IS_MULTIPLE,
              field: 'isMultiple',
              value: false,
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_QUESTION_IS_ADD_ANSWER,
              field: 'isAddAnswer',
              value: false,
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_QUESTION_IS_ACTIVE,
              field: 'isActive',
              value: false,
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
            },
          ]
        ]
      },
      {
        caption: EnumTranslateKey.UI_FORM_SECTION_CAPTION_HU_QUESTION_ANSWERS,
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_QUESTION_ANSWERS,
              field: 'answers',
              value: [],
              controlType: EnumFormBaseContolType.GRIDBUFFER,
              type: 'children',
              // When using EnumFormBaseContolType.GRIDBUFFER
              onBufferFormCreated: this.onBufferFormCreated,
              gridBufferFormSections: [
                {
                  rows: [
                    [
                      {
                        flexSize: 6,
                        label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ANSWER_ANSWER,
                        field: 'answer',
                        value: '',
                        controlType: EnumFormBaseContolType.TEXTBOX,
                        type: 'string',
                        validators: [
                          {
                            name: 'required',
                            validator: Validators.required,
                            errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                          },
                          {
                            name: 'minLength',
                            validator: Validators.min(8),
                            errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                          }
                        ]
                      },
                      {
                        flexSize: 6,
                        label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ANSWER_IS_ACTIVE,
                        field: 'isActive',
                        value: true,
                        controlType: EnumFormBaseContolType.CHECKBOX,
                        type: 'boolean',
                      }
                    ]
                  ]
                }
              ],
              gridBufferTableColumns: [
                {
                  caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
                  field: 'id',
                  hidden: true,
                  type: 'string',
                  align: 'left',
                  width: 30,
                },
                {
                  caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ANSWER_ANSWER,
                  field: 'answer',
                  type: 'string',
                  align: 'left',
                  width: 500,
                },
                {
                  caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ANSWER_IS_ACTIVE,
                  field: 'isActive',
                  type: 'boolean',
                  align: 'center',
                  width: 100,
                },
              ]
            },
          ]
        ]
      }
    ];
  constructor(
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private appService: AppService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_HU_QUESTION_EDIT;

    this.crud = {
      c: api.HU_QUESTION_CREATE,
      r: api.HU_QUESTION_READ,
      u: api.HU_QUESTION_UPDATE,
      d: api.HU_QUESTION_DELETE,
    };

  }
  /* #endregion Properties to be passed into core-page-edit */

  ngOnInit(): void {

    this.loading = true;


    setTimeout(() => {
      this.radioOptions$.next([
        {
          value: 1000,
          text: 'Option A'
        },
        {
          value: 10000,
          text: 'Option B'
        }
      ])
    }, 2000)

    /*
    this.subsctiptions.push(
      //this.appService.get()
    )
    */

  }

  onBufferFormCreated(form: FormGroup) {
    //alert("THIS SHOWS THAT FORMGROUP OF THE CONTROL HAS BEEN CREATED. DO SOMTHING WITH THIS EVENT IF NEEDED")
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;

    setTimeout(() => {
      this.form.patchValue({
        radioValue: 10000
      })
    }, 10000)
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subsctiptions.map(x => x?.unsubscribe())
  }

}