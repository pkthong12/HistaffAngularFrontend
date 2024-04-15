import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { StaffProfileComponent } from 'src/app/main/cms/profile/appbusiness/staffprofile/staffprofile.component';
import { ICoreTableColumnItem } from '../../core-table/core-table.component';
import { EnumSortDirection, ISortItem } from 'src/app/interfaces/IQueryListRequest';

@Component({
  selector: 'core-employee-seeker',
  templateUrl: './core-employee-seeker.component.html',
  styleUrls: ['./core-employee-seeker.component.scss']
})
export class CoreEmployeeSeekerComponent extends StaffProfileComponent implements AfterViewInit {

  override title = EnumTranslateKey.UI_COMPONENT_TITLE_EMPLOYEE_SEEKER;
  override height: number = 620;

  override outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    },
    {
      field: "code",
      sortDirection: EnumSortDirection.ASC
    },
  ]

  override columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_JOB_ORDER_NUM,
      field: 'jobOrderNum',
      type: 'string',
      align: 'right',
      width: 0,
      hidden: true,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_AVATAR, // to be asigned to EnumTranslateKey
      field: 'avatar',
      type: 'string',
      align: 'center',
      hideSearchBox: true,
      width: 80,
      templateRef: this.avatarTemplate,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_EMPLOYEE_CODE, // to be asigned to EnumTranslateKey
      field: 'code',
      type: 'string',
      align: 'left',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_FULLNAME, // to be asigned to EnumTranslateKey
      field: 'fullname',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_ORG_NAME, // to be asigned to EnumTranslateKey
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_POSITION_NAME, // to be asigned to EnumTranslateKey
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_WORK_STATUS_NAME, // to be asigned to EnumTranslateKey
      field: 'workStatusName',
      type: 'string',
      align: 'left',
      width: 200,
    },
  ]

  @Input() multiMode!: boolean;
  @Input() preDefinedOuterParam$!: BehaviorSubject<any>;

  @Output() rowDoubleClick = new EventEmitter();
  @Output() selectedIdsChange = new EventEmitter();
  @Output() selectedDataChange = new EventEmitter();
  @Output() columnsInit = new EventEmitter();

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    if (this.preDefinedOuterParam$) {
      this.subscriptions.push(
        this.preDefinedOuterParam$.subscribe(x => {
          if (this.outerParam$.value === null) {
            this.outerParam$.next(x);
          } else {
            this.outerParam$.next({
              ...this.outerParam$.value,
              ...x
            });
          }
        })
      )
    }
    this.columnsInit.emit(this.columns);
  }

  override onRowDoubleClick(e: any) {
    this.rowDoubleClick.emit(e)
  }

  onSelectedIdsChange(e: any) {
    this.selectedIdsChange.emit(e)
  }

  onSelectedDataChange(e: any[]) {
    this.selectedDataChange.emit({
      columns: this.columns,
      data: e
    })
  }

}
