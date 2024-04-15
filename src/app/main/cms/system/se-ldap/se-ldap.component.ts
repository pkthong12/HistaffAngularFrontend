import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { BaseComponent } from 'src/app/libraries/base-component/base/base.component';
import {
  ICorePageListApiDefinition,
  ICorePageListCRUD,
  ICorePageListEditRouting,
} from 'src/app/libraries/core-page-list/core-page-list.component';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

@Component({
  selector: 'cms-app-seldap',
  templateUrl: './se-ldap.component.html',
  styleUrls: ['./se-ldap.component.scss'],
})
export class SeLdapComponent extends BaseComponent implements AfterViewInit {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_SE_LDAP;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SE_LDAP_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.SE_LDAP_DELETE_IDS,
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: 'id',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_LDAP_LDAP_NAME,
      field: 'ldapName',
      type: 'string',
      align: 'left',
      width: 350,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_LDAP_DOMAIN_NAME,
      field: 'domainName',
      type: 'string',
      align: 'left',
      width: 350,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_LDAP_BASE_DN,
      field: 'baseDn',
      type: 'string',
      align: 'left',
      width: 500,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_LDAP_PORT,
      field: 'port',
      type: 'number',
      align: 'left',
      width: 250,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(public override mls: MultiLanguageService) {
    super(mls);
  }
  ngAfterViewInit(): void {}

  onOrgIdChange(orgId: number) {}
}
