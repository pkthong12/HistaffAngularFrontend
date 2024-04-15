import { Component } from '@angular/core';
import { api } from 'src/app/constants/api/apiDefinitions';
import { ICorePageEditCRUD, ICorePageEditColumnComposition } from 'src/app/libraries/core-page-edit/core-page-edit.component';

import { FormGroup, Validators } from '@angular/forms';
import { EnumFormBaseContolType, ICoreFormSection } from 'src/app/libraries/core-form/core-form/enum-interfaces';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import { DialogService } from 'src/app/services/dialog.service';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { BehaviorSubject } from 'rxjs';

import { CoreFormService } from 'src/app/libraries/core-form/core-form.service';

@Component({
  selector: 'app-language-edit',
  templateUrl: './language-edit.component.html',
  styleUrls: ['./language-edit.component.scss']
})
export class LanguageEditComponent extends BaseEditComponent {

  /* Properties to be passed into core-page-edit */

  override entityTable = "SYS_LANGUAGE";

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_LANGUAGE_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_LANGUAGE_KEY,
              field: 'key',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              focus$: new BehaviorSubject<any>(null),
              blur$: new BehaviorSubject<any>(null),
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
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_LANGUAGE_VI,
              field: 'vi',
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
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_LANGUAGE_EN,
              field: 'en',
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
        ]
      },
      {
        updateModeOnly: true,
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_CREATED_DATE,
              field: 'createdDate',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: true,
              pipe: EnumCoreTablePipeType.DATE_TIME
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_CREATED_BY,
              field: 'createdByUsername',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: true,
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_UPDATED_DATE,
              field: 'updatedDate',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text',
              pipe: EnumCoreTablePipeType.DATE_TIME
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_UPDATED_BY,
              field: 'updatedByUsername',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              textareaRows: 12,
              readonly: true,
              type: 'text',
            },
          ]
        ]
      }
    ];
  constructor(
    public override dialogService: DialogService,
    private coreFormService: CoreFormService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_LANGUAGE_EDIT;

    this.crud = {
      c: api.SYS_LANGUAGE_CREAT,
      r: api.SYS_LANGUAGE_READ,
      u: api.SYS_LANGUAGE_UPDATE,
      d: api.SYS_LANGUAGE_DELETE,
    };

  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;

    this.coreFormService.getFormBaseControlByName(this.sections, 'key')?.focus$?.subscribe(x => {
      console.log("key focused")
    })

    this.coreFormService.getFormBaseControlByName(this.sections, 'key')?.blur$?.subscribe(x => {
      console.log("key unfocused")
    })

  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

}
