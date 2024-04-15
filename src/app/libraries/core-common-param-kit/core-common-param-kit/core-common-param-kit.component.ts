import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICoreChecklistOption } from '../../core-checklist/core-checklist/core-checklist.component';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { ICoreParamControl } from '../../core-header-params/enum-and-interfaces';
import { EnumFormBaseContolType } from '../../core-form/core-form/enum-interfaces';
import { api } from 'src/app/constants/api/apiDefinitions';
import { BaseComponent } from '../../base-component/base/base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { AppService } from 'src/app/services/app.service';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';

export interface ICoreCommonParamKitEventEmitterData {
  field: string;
  value: any;
}

@Component({
  selector: 'core-common-param-kit',
  templateUrl: './core-common-param-kit.component.html',
  styleUrls: ['./core-common-param-kit.component.scss'],
})
export class CoreCommonParamKitComponent
  extends BaseComponent
  implements OnInit, AfterViewInit {
  @Input() enableTimeZoneConverterForDateTimePeriodParameters!: boolean;
  @Input() datePeriodComparisonFor!: string;
  @Input() datePeriodComparisonForLabelKey!: EnumTranslateKey;
  @Input() statusInclusionFor!: string;
  @Input() statusInclusionForLabelKey!: EnumTranslateKey;
  @Input() statusOptionsApi!: api;
  @Input() hideDatePeriodComparison!: boolean;
  @Input() hideStatusInclusion!: boolean;
  @Input() hideGeneralSearch!: boolean;
  @Output() onChange = new EventEmitter<ICoreCommonParamKitEventEmitterData>();

  statusOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);

  onNgModelChange = (ngModel: string, value: any) => {
    console.log('onNgModelChange', ngModel, value);
    this.onChange.emit({
      field: ngModel,
      value,
    });
  };

  paramRows!: ICoreParamControl[][];

  constructor(
    public override mls: MultiLanguageService,
    private appService: AppService
  ) {
    super(mls);
  }

  override ngOnInit(): void {
    this.subscriptions.push(this.mls.lang$.subscribe((x) => (this.lang = x)));

    if (!!this.hideDatePeriodComparison) {
      this.paramRows = [
        [
          {
            flexSize: 3,
            name: 'generalSearch',
            ngModel: '',
            ngModelChange: this.onNgModelChange,
            value: '',
            label: EnumTranslateKey.UI_CORE_PARAMS_GENERAL_SEARCH,
            controlType: EnumFormBaseContolType.TEXTBOX,
            hidden: this.hideGeneralSearch
          },
          {
            flexSize: !this.hideGeneralSearch ? 3 : 10,
            name: 'statusIds',
            ngModel: [],
            ngModelChange: this.onNgModelChange,
            value: null,
            hidden: this.hideStatusInclusion,
            label: this.statusInclusionForLabelKey,
            controlType: EnumFormBaseContolType.CHECKLIST,
            checklistOptions$: this.statusOptions$,
          },
        ]
      ]
    } else {
      this.paramRows = [
        [
          {
            flexSize: 3,
            name: 'generalSearch',
            ngModel: '',
            ngModelChange: this.onNgModelChange,
            value: '',
            label: EnumTranslateKey.UI_CORE_PARAMS_GENERAL_SEARCH,
            controlType: EnumFormBaseContolType.TEXTBOX,
          },
          {
            flexSize: 3,
            name: 'dateFrom',
            ngModel: null,
            ngModelChange: this.onNgModelChange,
            value: null,
            hidden: this.hideDatePeriodComparison,
            label: this.datePeriodComparisonForLabelKey,
            controlType: EnumFormBaseContolType.DATEPICKER,
          },
          {
            flexSize: 3,
            name: 'dateTo',
            ngModel: null,
            ngModelChange: this.onNgModelChange,
            value: null,
            hidden: this.hideDatePeriodComparison,
            label: this.datePeriodComparisonForLabelKey,
            controlType: EnumFormBaseContolType.DATEPICKER,
          },
          {
            flexSize: 3,
            name: 'statusIds',
            ngModel: [],
            ngModelChange: this.onNgModelChange,
            value: null,
            hidden: this.hideStatusInclusion,
            label: this.statusInclusionForLabelKey,
            controlType: EnumFormBaseContolType.CHECKLIST,
            checklistOptions$: this.statusOptions$,
          },
        ],
      ];

    }

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.appService.get(this.statusOptionsApi).subscribe((x) => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            if (body.statusCode === 200) {

              // Nếu là trạng thái nhân viên, chỉ check mặc định "Đang làm việc"
              // Trái lại thì check tất

              let isEmployeeStatusCase: boolean = true;
              body.innerBody.map((i: any) => {
                if (i.typeCode !== "EMP_STATUS") {
                  isEmployeeStatusCase = false;
                }
              })

              const newOptions: ICoreChecklistOption[] = [
                {
                  value: null,
                  text: this.mls.trans(EnumTranslateKey.UI_CORE_PARAMS_COMMON_NULL_STATUS, this.lang),
                  checked: isEmployeeStatusCase ? false : true
                }];
              const newStatusIds: (number | null)[] = isEmployeeStatusCase ? [] : [null];

              body.innerBody.map((m: any) => {
                newOptions.push({
                  value: m.id,
                  text: m.name,
                  checked: isEmployeeStatusCase ? (m.code === "ESW") : true
                });
                if (isEmployeeStatusCase && m.code === "ESW") newStatusIds.push(m.id);
              });
              
              this.statusOptions$.next(newOptions);

              this.paramRows.map(row => {
                row.map(column => {
                  if (column.name === 'statusIds') {
                    column.ngModel = newStatusIds;
                  }
                })
              })

              this.onChange.emit({
                field: "statusIds",
                value: newStatusIds
              })

            }
          }
        })
      );
    });
  }
}
