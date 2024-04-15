import { AfterViewInit, Component, ViewEncapsulation } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { api } from "src/app/constants/api/apiDefinitions";

import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { BaseComponent } from "src/app/libraries/base-component/base/base.component";
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting } from "src/app/libraries/core-page-list/core-page-list.component";
import { EnumCoreTablePipeType } from "src/app/libraries/core-table/EnumCoreTablePipeType";
import { ICoreTableColumnItem } from "src/app/libraries/core-table/core-table.component";
import { MultiLanguageService } from "src/app/services/multi-language.service";

@Component({
  selector: "app-ortherlist",
  templateUrl: "./ortherlist.component.html",
  styleUrls: ["./ortherlist.component.scss"],
})

export class OrtherListComponent extends BaseComponent implements AfterViewInit {
  orgId!: number;

  outerParam$ = new BehaviorSubject<any>(null);

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_OTHERLIST_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.SYS_OTHERLIST_DELETE_IDS
  }

  columns: ICoreTableColumnItem[] = [
    {
      caption: 'ContractType.ID',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_ORGNAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_JOB_DESC,
      field: 'jobDesc ',
      type: 'string',
      align: 'left',
      width: 200,
    },

    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_IS_ACTIVE,
      field: 'isActive',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_YES_NO,
      type: 'string',
      align: 'left',
      width: 100,
    },
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
  ) {
    super(mls);
  }
  ngAfterViewInit(): void {
    
  }

  onOrgIdChange(orgId: number) {
    if (!!this.outerParam$.value) {
      const newOuterParam = JSON.parse(JSON.stringify(this.outerParam$.value))
      newOuterParam['orgId'] = orgId;
      this.outerParam$.next(newOuterParam);
    } else {
      this.outerParam$.next({ orgId });
    }
  }
}