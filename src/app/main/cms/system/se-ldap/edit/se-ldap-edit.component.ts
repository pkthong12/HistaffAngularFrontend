import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { BehaviorSubject, map } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseEditComponent } from 'src/app/libraries/base-edit/base-edit/base-edit.component';
import { ICoreDropdownOption } from 'src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component';
import { ICoreFormSection, EnumFormBaseContolType } from 'src/app/libraries/core-form/core-form/enum-interfaces';
import {
  ICorePageEditCRUD,
  ICorePageEditColumnComposition,
} from 'src/app/libraries/core-page-edit/core-page-edit.component';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { PeriodStandardEditService } from 'src/app/main/cms/attendance/applist/periodstandard/edit/periodstandard.edit.service';
import { DialogService } from 'src/app/services/dialog.service';
@Component({
  selector: 'app-se-ldap-edit',
  templateUrl: './se-ldap-edit.component.html',
  styleUrls: ['./se-ldap-edit.component.scss'],
})
export class SeLdapEditComponent extends BaseEditComponent {
  override entityTable = 'SE_LDAP';

  loading: boolean = false;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_ID,
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            field: 'id',
            readonly: true,
            hidden: true,
            type: 'text',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SE_LDAP_LDAP_NAME,
            field: 'ldapName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SE_LDAP_DOMAIN_NAME,
            field: 'domainName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SE_LDAP_BASE_DN,
            field: 'baseDn',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SE_LDAP_PORT,
            field: 'port',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
          },
        ],
      ],
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
            pipe: EnumCoreTablePipeType.DATE_TIME,
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
            pipe: EnumCoreTablePipeType.DATE_TIME,
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
        ],
      ],
    },
  ];

  constructor(public override dialogService: DialogService, private pseService: PeriodStandardEditService) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SE_LDAP_EDIT;

    this.crud = {
      c: api.SE_LDAP_CREATE,
      r: api.SE_LDAP_READ,
      u: api.SE_LDAP_UPDATE,
      d: api.SE_LDAP_DELETE_IDS,
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
}
