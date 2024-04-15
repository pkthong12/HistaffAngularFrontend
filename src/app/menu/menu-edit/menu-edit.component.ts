import { Component } from '@angular/core';
import { api } from 'src/app/constants/api/apiDefinitions';
import { ICorePageEditCRUD, ICorePageEditColumnComposition } from 'src/app/libraries/core-page-edit/core-page-edit.component';

import { FormGroup, Validators } from '@angular/forms';
import { EnumFormBaseContolType, ICoreFormSection } from 'src/app/libraries/core-form/core-form/enum-interfaces';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import { DialogService } from 'src/app/services/dialog.service';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { ICorePageListApiDefinition } from 'src/app/libraries/core-page-list/core-page-list.component';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent  extends BaseEditComponent {

  /* Properties to be passed into core-page-edit */

  override entityTable = "SYS_MENU";

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;

  
  functionMccColumns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'left',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_GROUP_NAME,
      field: 'groupName',
      type: 'string',
      align: 'left',
      width: 250
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_MODULE_NAME,
      field: 'moduleName',
      type: 'string',
      align: 'left',
      width: 250
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_STATUS,
      field: 'status',
      type: 'string',
      align: 'left',
      width: 200
    }
  ];

  functionMccApiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_FUNCTION_QUERY_LIST,
  }

  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'number'
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MENU_SYS_FUNCTION,
              field: 'functionId',
              value: null,
              controlType: EnumFormBaseContolType.MCC,
              columns: this.functionMccColumns,
              shownFrom: 'name',
              apiDefinition: this.functionMccApiDefinition,
              getByIdApi: api.SYS_FUNCTION_READ,
              type: 'number'
            },            
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MENU_PARENT,
              field: 'parent',
              value: null,
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MENU_ICON_CLASS,
              field: 'iconClass',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MENU_CODE,
              field: 'code',
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
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ORDER_NUMBER,
              field: 'orderNumber',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              validators: [
                {
                  name: 'min',
                  validator: Validators.min(1),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
                }
              ]
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MENU_URL,
              field: 'url',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',

            }
          ]
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
    public override dialogService: DialogService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SYS_MENU_EDIT;

    this.crud = {
      c: api.SYS_MENU_CREAT,
      r: api.SYS_MENU_READ,
      u: api.SYS_MENU_UPDATE,
      d: api.SYS_MENU_DELETE,
    };

  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  onSubmitSuccess(e: any) {
    
  }

}
