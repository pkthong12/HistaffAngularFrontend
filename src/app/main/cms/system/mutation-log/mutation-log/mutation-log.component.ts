import { Component, OnDestroy, OnInit } from '@angular/core';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { ICorePageListApiDefinition, ICorePageListCRUD } from 'src/app/libraries/core-page-list/core-page-list.component';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';

@Component({
  selector: 'app-mutation-log',
  templateUrl: './mutation-log.component.html',
  styleUrls: ['./mutation-log.component.scss']
})
export class MutationLogComponent implements OnInit, OnDestroy {

  title = EnumTranslateKey.UI_COMPONENT_TITLE_SYS_MUTATION_LOG;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_MUTATION_LOG_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.SYS_MUTATION_LOG_DELETE_IDS
  }

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MUTATION_LOG_SYS_FUNCTION_CODE,
      field: 'sysFunctionCode',
      type: 'string',
      align: 'left',
      width: 125,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MUTATION_LOG_SYS_ACTION_CODE,
      field: 'sysActionCode',
      type: 'string',
      align: 'left',
      width: 180,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MUTATION_LOG_BEFORE,
      field: 'before',
      type: 'string',
      align: 'left',
      width: 600,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MUTATION_LOG_AFTER,
      field: 'after',
      type: 'string',
      align: 'left',
      width: 600,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MUTATION_LOG_USERNAME,
      field: 'username',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MUTATION_LOG_MUTATED_ON,
      field: 'createdDate',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE_TIME
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
