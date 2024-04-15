import { Component, ViewEncapsulation, OnInit, OnDestroy, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { setCulture } from '@syncfusion/ej2-base';
import { FilterService, VirtualScrollService } from '@syncfusion/ej2-angular-grids';
import { ListBoxComponent, CheckBoxSelection } from '@syncfusion/ej2-angular-dropdowns';
ListBoxComponent.Inject(CheckBoxSelection);
import {
  ICorePageListApiDefinition,
  ICorePageListCRUD,
  ICorePageListEditRouting,
} from 'src/app/libraries/core-page-list/core-page-list.component';
import { ICoreTableColumnItem } from 'src/app/libraries/core-table/core-table.component';

import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';

const _ = require('lodash');
setCulture('en');

@Component({
  selector: 'app-training-course',
  templateUrl: './trainingcourse.component.html',
  styleUrls: ['./trainingcourse.component.scss'],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class TrainingCourseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  orgId!: number;

  outerParam$ = new BehaviorSubject<any>(null);
  title = EnumTranslateKey.UI_COMPONENT_TITLE_TRAINING_COURSE;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.TR_COURSE_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.TR_COURSE_DELETE_IDS,
    toggleActiveIds: api.TR_COURSE_TOGGLE_ACTIVE_IDS,
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'center',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LISTSAL_IS_ACTIVE,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_CODE,
      field: 'courseCode',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_NAME,
      field: 'courseName',
      type: 'string',
      align: 'left',
      width: 350,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_DATE,
      field: 'courseDate',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_COSTS,
      field: 'costs',
      type: 'string',
      pipe: EnumCoreTablePipeType.NUMBER,
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 500,
    },
    
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  constructor(public mls: MultiLanguageService) {

  }
  ngOnInit(): void { }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }
  ngOnDestroy(): void { }
}
