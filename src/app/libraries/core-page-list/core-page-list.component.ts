import { Component, ElementRef, Input, OnDestroy, OnInit, AfterViewInit, ViewChild, TemplateRef, Output, EventEmitter, OnChanges, SimpleChanges, isDevMode, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ICoreTableColumnItem, ICoreTableToolClickEventEmitterData, ICoreTableToolItem, } from '../core-table/core-table.component';
import { EnumFilterOperator, EnumSortDirection, IFilterOperator, IInOperator, IPagination, IQueryListRequest, ISearchItem, ISortItem, } from 'src/app/interfaces/IQueryListRequest';
import { defaultPaging } from 'src/app/constants/defaultPaging';
import { CorePageListService, IGenerateTemplateRequest, IImportXlsxToDbRequest } from './core-page-list.service';
import { CorePageEditService } from '../core-page-edit/core-page-edit.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { AlertService } from '../alert/alert.service';
import { AppService } from 'src/app/services/app.service';
import { DialogService } from 'src/app/services/dialog.service';
import { RoutingService } from 'src/app/services/routing.service';
import { BehaviorSubject, Observable, Subscription, debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap, } from 'rxjs';
import { CorePageListState } from './core-page-list.state';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { IQueryListResponse } from 'src/app/interfaces/IQueryListResponse';
import { IIdsRequest } from 'src/app/interfaces/IIdsRequest';
import { alertOptions, noneAutoClosedAlertOptions, } from 'src/app/constants/alertOptions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { api } from 'src/app/constants/api/apiDefinitions';
import { ICoreButtonVNS } from '../core-button-group-vns/core-button-group-vns/ICoreButtonVNS';
import { EnumCoreButtonVNSCode } from '../core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode';
import { CoreFormControlBaseComponent } from '../core-form-control-base/core-form-control-base.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ICoreCommonParamKitEventEmitterData } from '../core-common-param-kit/core-common-param-kit/core-common-param-kit.component';
import { IToggleActiveIdsRequest, IToggleApproveIdsRequest, ITongleUnApproveIdsRequest } from 'src/app/interfaces/IToggleActiveIdsRequest';
import { AuthService } from 'src/app/services/auth.service';
import { ISysMutationLogBeforeAfterRequest } from '../core-page-edit/core-page-edit.component';
import { LongTaskService } from '../services/long-task.service';
import { LayoutService } from 'src/app/services/layout.service';
import { CoreCompositionService } from '../core-composition/core-composition.service';
import { CoreButtonGroupService } from '../core-button-group-vns/core-button-group-service';
import { ICoreButtonGroupStatus } from '../core-button-group-vns/core-button-group-service';
import { JsonService } from 'src/app/services/json.service';

/* Khi không có dòng nào được tick chọn, các nút sau sẽ được ẩn đi: */
const EMPTY_SELECTION_HIDDEN_BUTTON: EnumCoreButtonVNSCode[] = [
  EnumCoreButtonVNSCode.HEADER_EDIT, // Sửa
  EnumCoreButtonVNSCode.HEADER_LOCK, // Khóa
  EnumCoreButtonVNSCode.HEADER_UNLOCK, // Mở khóa
  EnumCoreButtonVNSCode.HEADER_ACTIVATE, // Áp dụng
  EnumCoreButtonVNSCode.HEADER_INACTIVATE, // Ngừng áp dụng
  EnumCoreButtonVNSCode.HEADER_RESET, // Reset (mật khẩu)
  EnumCoreButtonVNSCode.HEADER_COPY, // Sao chép

  // Các thể loại in
  EnumCoreButtonVNSCode.HEADER_PRINT,
  EnumCoreButtonVNSCode.HEADER_PRINT_2C,
  EnumCoreButtonVNSCode.HEADER_PRINT_2C_2008,
  EnumCoreButtonVNSCode.HEADER_PRINT_2C_98,
  //

  EnumCoreButtonVNSCode.HEADER_DELETE, // xóa
  EnumCoreButtonVNSCode.HEADER_APPROVE, // phê duyệt
  EnumCoreButtonVNSCode.HEADER_REJECT, // từ chối
  EnumCoreButtonVNSCode.HEADER_UNAPPROVE, // bỏ phê duyệt
  EnumCoreButtonVNSCode.HEADER_PENDING_APPROVE, // mở chờ phê duyệt
  EnumCoreButtonVNSCode.HEADER_LIQUIDATE_CONTRACT, // thanh lý hợp đồng
]

declare let coreFileUtils: any;
const { blobToBase64 } = coreFileUtils;

export interface ICorePageListApiDefinition {
  queryListRelativePath: string;
}

export interface ICorePageListSearchObject {
  previous: ISearchItem[];
  current: ISearchItem[];
}

export interface ICorePageListEditRouting {
  auxiliary: string;
}

export interface ICorePageListCRUD {
  deleteIds?: api;
  toggleActiveIds?: api;
  toggleApproveIds?: api;
  toggleUnapproveIds?: api;
}

export interface IXlsxImportObject {
  xlsxSid: string,
  xlsxExCode: string,
  xlsxSession: number,
}

export interface ICoreTableFlatColumnItem {
  caption: string;
  field: string;
  type?: string;
  pipe?: string;
  align?: string;
  width?: number;
  hidden?: boolean;
}

@Component({
  selector: 'core-page-list',
  templateUrl: './core-page-list.component.html',
  styleUrls: ['./core-page-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CorePageListComponent,
    },
    CorePageListState,
  ],
})
export class CorePageListComponent extends CoreFormControlBaseComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  /* WHEN YOU DO NOT WANT POPUP, pass [normalMode]="true" */
  @Input() normalMode!: boolean;
  /* START: Some routed components, such as StaffProfile, may be reused as readonly for seeking */
  @Input() hideHeader!: boolean;
  @Input() hideButtonGroup!: boolean;
  @Input() seekerMode!: boolean;
  @Input() mccMode!: boolean;
  @Input() height!: number;
  /* END: Some routed components, such as StaffProfile, may be reused as readonly for seeking */

  /* change these 2 props to wrap header texts */
  @Input() headerWrap!: boolean;
  @Input() headerFirstRowHeight!: number;
  /** */

  /**Show ParamKit */
  @Input() enableTimeZoneConverterForDateTimePeriodParameters!: boolean;
  @Input() showParamKit!: boolean;
  @Input() datePeriodComparisonFor!: string;
  @Input() datePeriodComparisonForLabelKey!: EnumTranslateKey;
  @Input() statusInclusionFor!: string;
  @Input() statusInclusionForLabelKey!: EnumTranslateKey;
  @Input() statusOptionsApi!: api;
  @Input() hideDatePeriodComparison!: boolean; // if we want not to use date p filter
  @Input() hideStatusInclusion!: boolean; // if we want not to use status filter
  /**End Show ParamKit */

  @Input() title!: EnumTranslateKey;
  @Input() hasIdOfStringType!: boolean;
  @Input() hideCheck!: boolean;
  @Input() apiDefinition!: ICorePageListApiDefinition;
  @Input() columns!: ICoreTableColumnItem[];
  @Input() frozen!: number;
  @Input() inlineTools!: ICoreTableToolItem[];
  @Input() inlineToolItems!: EnumCoreButtonVNSCode[];
  @Input() editRoute!: ICorePageListEditRouting;
  @Input() crud!: ICorePageListCRUD;
  @Input() showListInlineTools!: boolean;
  @Input() top!: TemplateRef<any>;
  @Input() left!: TemplateRef<any>;
  @Input() outerParam$!: BehaviorSubject<any>; // Some simple master data do not have outerParam$ IMPORTANT!!!
  @Input() outerSort!: ISortItem[];
  @Input() outerFilterOperators!: IFilterOperator[];
  @Input() outerInOperators!: IInOperator[];
  @Input() autoResizeWithWindow!: boolean;
  @Input() extraManualOffset!: number;
  @Input() wrap!: boolean;
  @Input() rowHeight!: string;
  @Input() selfResolveCorePageHeaderButtonClick!: boolean; // The caller will itself resolve events emmited by CorePageHeader buttons (for some)
  @Input() clearData$!: BehaviorSubject<boolean>;
  @Input() deleteValidateFn!: Function;
  @Input() generateTemplateRequest!: IGenerateTemplateRequest;
  @Input() importPreviewPath!: string;
  @Input() columnSearchDefaultOpen!: boolean;
  @Input() fixedPageSize!: number;
  @Input() disableDoubleClick!: boolean;

  @Input() noPaddingCell!: boolean;

  @Output() corePageHeaderButtonClick = new EventEmitter<ICoreButtonVNS>();
  @Output() rowClick = new EventEmitter();
  @Output() rowDoubleClick = new EventEmitter();
  @Output() selectedIdsChange = new EventEmitter();
  @Output() selectedDataChange = new EventEmitter();
  @Output() onInstanceCreated = new EventEmitter<number>();
  @Output() onInputFileBase64DataReady = new EventEmitter();

  @ViewChild('container') container!: ElementRef;
  @ViewChild('corePageListContainer') corePageListContainer!: ElementRef;
  @ViewChild('paginationContainer') paginationContainer!: ElementRef;
  @ViewChild('fileImport') fileImport!: ElementRef;

  geometricDone: boolean = false;

  heightResizing: boolean = false;
  height$ = new BehaviorSubject<number>(0);
  topPlaceHeight$ = new BehaviorSubject<number>(0);

  resizeHeightFlag$ = new BehaviorSubject<boolean>(false);

  paginationHeight!: number;
  compositionHeight!: number;
  corePageListInstanceNumber!: number;
  dialogInstanceNumber!: number;

  resizeStream$ = fromEvent(window, 'resize');

  clickGenerateTemplate$ = new BehaviorSubject<number>(0);

  subscriptions: Subscription[] = [];
  queryListSubscription!: Subscription;
  loading!: boolean;

  selectedIds: string[] | number[] = [];
  selectedData: any[] = [];

  isAdmin: boolean = false;

  viewInitDone!: boolean;

  /* start: passing this var to Pagination */

  pageCount!: number;

  // Passing BehaviorSubject to other component is like using a service (that holds this BehaviorSubject) injected to both components
  currentPage$ = new BehaviorSubject<number>(1);

  /* end: passing this var to Pagination */

  pageSize$!: BehaviorSubject<number>;

  filter$ = new BehaviorSubject<any>(null);
  filterOperators$ = new BehaviorSubject<IFilterOperator[]>([]);
  inOperators$ = new BehaviorSubject<IInOperator[]>([]);
  generalSearch$ = new BehaviorSubject<string>('');
  search$ = new BehaviorSubject<ICorePageListSearchObject | null>(null);
  sort$ = new BehaviorSubject<ISortItem[]>([]);
  pagination$!: BehaviorSubject<IPagination>;
  forceReloadingFlag$ = new BehaviorSubject<boolean>(false);
  queryListRequest$ = new BehaviorSubject<IQueryListRequest>({ lang: 'vi' });
  queryListStream$!: Observable<any>;
  innerBodyCount$ = new BehaviorSubject<number>(1);

  pauseSubsctiption: boolean = false;
  list!: any[];
  tableHeight!: number;
  availableColumnsForGeneralSearch!: string[];
  dataImport!: any;
  pendingAction!: EnumCoreButtonVNSCode;
  idState: any;
  templateFileName!: string;

  longApiRunning!: boolean;
  prefetchLoading!: boolean;

  buttonGroupStatus!: ICoreButtonGroupStatus;

  exportCorePageListGridToExcelSubscription!: Subscription;

  constructor(
    private corePageListService: CorePageListService,
    private corePageListState: CorePageListState,
    private corePageEditService: CorePageEditService,
    private router: Router,
    private route: ActivatedRoute,
    private mls: MultiLanguageService,
    private alertService: AlertService,
    private authService: AuthService,
    private appService: AppService,
    private dialogService: DialogService,
    private routingService: RoutingService,
    private longTaskService: LongTaskService,
    public layoutService: LayoutService,
    private coreCompositionService: CoreCompositionService,
    private coreButtonGroupService: CoreButtonGroupService,
    private jsonService: JsonService,
  ) {
    super();

    if (!!!this.inlineToolItems) {
      this.inlineToolItems = [
        EnumCoreButtonVNSCode.HEADER_EDIT,
        EnumCoreButtonVNSCode.HEADER_DELETE
      ]
    }

    let navigation = this.router?.getCurrentNavigation()
    if (navigation) {
      const extras = navigation.extras;
      if (!!extras && 'state' in extras) {
        if (isDevMode()) {
          this.alertService.info(`CorePageList is using old instance number ${this.corePageListInstanceNumber}`, alertOptions)
        }
        if (!!extras.state && 'id' in extras.state!) {
          this.idState = extras.state['id'];
        }
        if (!!extras.state && 'instanceNumber' in extras.state!) {
          this.corePageListInstanceNumber = extras.state['instanceNumber'];
        }
      } else {

      }
    }

    /* THIS CODE WILL DEFINE outerParam$ FILTER for import preview task */
    if (navigation?.extras?.state) {
      const importPreviewOuterParam = navigation?.extras?.state!["importPreviewOuterParam"]
      if (!!this.outerParam$) {
        if (!!this.outerParam$?.value) {
          if (!!importPreviewOuterParam) {
            let newOuterParam = this.outerParam$.value;
            newOuterParam = {
              ...newOuterParam,
              ...importPreviewOuterParam,
            }
            this.outerParam$.next(newOuterParam);
          }
        } else {
          if (!!importPreviewOuterParam) {
            this.outerParam$.next(importPreviewOuterParam);
          }
        }
      } else {
        if (!!importPreviewOuterParam) {
          this.outerParam$ = new BehaviorSubject<any>(importPreviewOuterParam)
          this.outerParamSubscribeFn();
        }
      }
    }
    /********************************************************************/

    if (!!!this.corePageListInstanceNumber) this.corePageListInstanceNumber = new Date().getTime();
    this.corePageListService.instances.push({
      instanceNumber: this.corePageListInstanceNumber,
      reloadFlag$: new BehaviorSubject<boolean>(false),
      id$: new BehaviorSubject<any>(null),
      tbodyHeight$: new BehaviorSubject<any>(null),
    });

    if (!!this.idState) {
      this.queryListRequest$.next({
        ...this.queryListRequest$.value,
        id: this.idState
      })
    }

    this.templateFileName = this.generateTemplateRequest?.exCode;

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['outerInOperators']) {
      const currentInOperators: IInOperator[] = this.inOperators$.value;
      const changedInOperators: IInOperator[] = changes['outerInOperators'].currentValue || [];
      const remainInOperators = currentInOperators.filter(x => !!!changedInOperators.filter(y => y.field === x.field).length);
      const newInOperators = [...remainInOperators, ...changedInOperators];

      //const newInOperators = [...changedInOperators];

      this.inOperators$.next(newInOperators);
    }
    if (changes['height']) {

      // Không thể tính được số đo hình học nếu AfterViewInit chưa chạy
      // Nên ở đây ta chỉ đơn giản là gán thay đổi của height vào height$
      this.height$.next(changes['height'].currentValue);

      /*
      if (!!changes['height'].currentValue) {
        // Nếu chiều cao của CorePageList được truyền vào
        // Thì cần tính chiều cao của CoreComposition = this.height
        // Nếu hiển thị CorePageHeader thì cần trừ tiếp đi corePageHeaderHeight
        this.compositionHeight = changes['height'].currentValue - (!!this.hideHeader ? 0 : this.layoutService.corePageHeaderHeight);
        // Tính luôn chiều cao tableHeight
        // Nếu extraManualOffset được truyền vào một cách thủ công
        if (!!this.extraManualOffset) {
          this.tableHeight = changes['height'].currentValue - this.extraManualOffset - this.layoutService.corePaginationHeight;
        } else {
          // Cần tính chiều cao của phần top khi hook AfterViewInit được kích hoạt
        }
      }
      */
    }

    if (changes['outerFilterOperators']) {
      this.mergeFilterOperator();
    }

    this.queryListSubscribe();

  }

  /* QueryList sub */
  subscribeQueryList(x: any) {
    if (x.ok && x.status === 200) {
      const body: IFormatedResponse = x.body;
      if (body.statusCode === 200) {
        const innerBody: IQueryListResponse = body.innerBody;
        if (!!innerBody) {

          /* #region Trickily reset id$, tmpFilter$ and tmpInOperators$ */
          this.pauseSubsctiption = true; // <== Pause

          const newQueryListRequest = this.queryListRequest$.value;

          this.corePageListState.id$.next(null)
          newQueryListRequest.id = null;

          /* This code block raises a bug generally */
          // if (!!this.corePageListState.id$.value) {
          //   this.corePageListState.id$.next(null)
          //   newQueryListRequest.id = null;
          // } else {
          //   newQueryListRequest.id = null;
          // };

          if (!!this.tmpFilterActive) {
            const oldFilter = JSON.parse(JSON.stringify(this.primaryFilter));
            this.filter$.next(oldFilter);
            newQueryListRequest.filter = oldFilter;
            this.primaryFilter = undefined;
            this.tmpFilterActive = false;
          }

          if (!!this.tmpInOperatorsActive) {
            const oldInOpertors = JSON.parse(JSON.stringify(this.primaryInOperators));
            this.inOperators$.next(oldInOpertors);
            newQueryListRequest.inOperators = oldInOpertors;
            this.primaryInOperators = [];
            this.tmpInOperatorsActive = false;
          }

          this.queryListRequest$.next(newQueryListRequest);

          this.pauseSubsctiption = false; // <== Active back again

          /* #endregion Trickily reset id$, tmpFilter$ and tmpInOperators$ */

          this.list = innerBody.list!;

          this.innerBodyCount$.next(innerBody.count!);
          this.pageCount = Math.ceil(innerBody.count! / this.pageSize$.value);

          if (innerBody.page !== this.currentPage$.value) {
            this.pauseSubsctiption = true; // <== Pause
            this.currentPage$.next(innerBody.page!);
            this.pauseSubsctiption = false; // <== Active back again
          }
        } else {
          this.list = [];

          this.pageCount = 0;
          //this.responseService.resolve(body);
        }
      } else {
        this.list = [];

        this.pageCount = 0;
        //this.responseService.resolve(body);
      }
    } else {
      // if (isDevMode()) {
      //   this.alertService.error(
      //     JSON.stringify(x, null, 2),
      //     noneAutoClosedAlertOptions
      //   );
      // }
    }

    this.loading = false;
  }

  mergeFilterOperator(): void {
    /* START: Merge filterOperator with outer one */
    if (!!this.outerFilterOperators) {
      if (this.filterOperators$.value) {
        const currentFilterOperators: IFilterOperator[] = JSON.parse(JSON.stringify(this.filterOperators$.value));
        this.outerFilterOperators.map((ofo) => {
          const filter = currentFilterOperators.filter((o) => o.field === ofo.field && o.operator === ofo.operator);
          // optimistically filter.length === 1
          if (!!filter.length) {
            filter[0].dateTimeValue = ofo.dateTimeValue;
          } else {
            currentFilterOperators.push(ofo);
          }
        });
        this.filterOperators$.next(currentFilterOperators);
      } else {
        this.filterOperators$.next(this.outerFilterOperators);
      }
    }
    /* END: Create/Merge/Overwrite filterOperator with outer one */
  }
  tmpFilterActive!: boolean;
  tmpInOperatorsActive!: boolean;
  primaryFilter!: any;
  primaryInOperators!: IInOperator[];

  outerParamSubscribeFn(): void {
    this.subscriptions.push(
      this.outerParam$.subscribe((x) => {
        console.log('this.outerParam$ changes', x);

        // merge or overwrire current filter
        const currentFilter = this.filter$.value;
        if (!!currentFilter) {
          const newFilter = {
            ...currentFilter,
            ...x,
          };
          this.filter$.next(newFilter);
        } else {
          this.filter$.next(x);
        }
      })
    );
  }

  ngOnInit(): void {

    this.subscriptions.push(
      this.clickGenerateTemplate$.pipe(
        map(x => {
          console.log("map", x)
          return x;
        }),
        filter(x => {
          console.log("filter", !!x)
          return !!x
        }),
        switchMap(x => {
          this.longApiRunning = true;
          this.templateFileName = this.generateTemplateRequest?.exCode + "_" + x + ".xlsx"
          return this.corePageListService.generateTemplate(this.generateTemplateRequest)
        })
      ).subscribe(x => {
        this.longApiRunning = false;
        if (x.ok && x.status === 200) {

          if (x.body.statusCode === 400) return

          let downloadLink = document.createElement("a");
          downloadLink.href = window.URL.createObjectURL(new Blob([x.body]))
          downloadLink.setAttribute("download", this.templateFileName);
          document.body.appendChild(downloadLink);
          downloadLink.click();
        } else {
          this.alertService.info("Download failed. Please contact your developer team to resolve", noneAutoClosedAlertOptions)
        }
      }))

    this.subscriptions.push(
      this.corePageListService.tmpFilter$.pipe(filter(x => !!x && !!!this.tmpFilterActive)).subscribe(x => {
        this.primaryFilter = JSON.parse(JSON.stringify(this.filter$.value));
        this.filter$.next(x);
        this.corePageListService.tmpFilter$.next(null);
        this.tmpFilterActive = true;
      })
    )
    this.subscriptions.push(
      this.corePageListService.tmpInOperators$.pipe(filter(x => !!x.length && !!!this.tmpInOperatorsActive)).subscribe(x => {
        this.primaryInOperators = JSON.parse(JSON.stringify(this.inOperators$.value));
        this.inOperators$.next(x);
        this.corePageListService.tmpInOperators$.next([]);
        this.tmpInOperatorsActive = true;
      })
    )
    if (!!this.outerSort) {
      this.sort$.next(this.outerSort);
    }

    this.onInstanceCreated.emit(this.corePageListInstanceNumber);

    if (!!this.fixedPageSize) {
      this.pageSize$ = new BehaviorSubject<number>(this.fixedPageSize);
      this.pagination$ = new BehaviorSubject<IPagination>({
        skip: 0,
        take: this.fixedPageSize,
      });
    } else {
      this.pageSize$ = new BehaviorSubject<number>(defaultPaging.take);
      this.pagination$ = new BehaviorSubject<IPagination>({
        skip: 0,
        take: defaultPaging.take,
      });

    }

    const newAvailableColumnsForGeneralSearch: string[] = [];
    this.columns.map((x) => {
      // if (x.type === 'text' || x.type === 'string' || x.type === 'date' || x.type === 'datetime') {
      // if (x.type === 'date') {
      if (x.type === 'text' || x.type === 'string') {
        newAvailableColumnsForGeneralSearch.push(x.field);
      }
    });
    this.availableColumnsForGeneralSearch = newAvailableColumnsForGeneralSearch;

    if (!!this.clearData$) {
      this.subscriptions.push(
        this.clearData$
          .pipe(
            filter((x) => {
              return !!x;
            })
          )
          .subscribe((_) => {
            this.list = [];
            this.clearData$.next(false);
          })
      );
    }

    this.paginationHeight = Number(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--size-core-pagination-height')
        .replace('px', '')
    );

    // set default sort direction

    const newSort: ISortItem[] = [];
    this.columns.filter(x => x.field !== "id").map((c) => {
      newSort.push({
        field: c.field,
        sortDirection: EnumSortDirection.NONE,
      });
    });
    // accept defaultsort param
    this.sort$.next(newSort.map(t1 => ({ ...t1, ...this.sort$.value.find(t2 => t2.field === t1.field) })));

    /* START: Merge filterOperator with outer one */
    if (!!this.outerFilterOperators) {
      if (this.filterOperators$.value) {
        const currentFilterOperators: IFilterOperator[] = JSON.parse(
          JSON.stringify(this.filterOperators$.value)
        );
        this.outerFilterOperators.map((ofo) => {
          const filter = currentFilterOperators.filter(
            (o) => o.field === ofo.field
          );
          // optimistically filter.length === 1
          if (!!filter.length) {
            filter[0].operator = ofo.operator;
          } else {
            currentFilterOperators.push(ofo);
          }
        });
        this.filterOperators$.next(currentFilterOperators);
      } else {
        this.filterOperators$.next(this.outerFilterOperators);
      }
    }
    /* END: Create/Merge/Overwrite filterOperator with outer one */

    /* START: Subscription for outerParam$ */
    // Some simple master data do not have outerParam$ IMPORTANT!!!
    if (!!this.outerParam$) {
      this.outerParamSubscribeFn();
    }
    /* END: Subscription for outerParam$ */

    /* START: Subscriptions for queryListRequest$ */

    this.subscriptions.push(
      this.mls.lang$.subscribe((x) => {
        this.queryListRequest$.next({
          ...this.queryListRequest$.value,
          lang: x,
        });
      })
    );

    this.subscriptions.push(
      this.generalSearch$
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((x) => {
          this.queryListRequest$.next({
            ...this.queryListRequest$.value,
            generalSearch: {
              ...this.queryListRequest$.value.generalSearch,
              searchFor: x,
              availableColumns: this.availableColumnsForGeneralSearch,
            },
          });
        })
    );

    this.subscriptions.push(
      this.filter$.subscribe((x) => {
        this.queryListRequest$.next({
          ...this.queryListRequest$.value,
          filter: x,
        });
      })
    );

    this.subscriptions.push(
      this.filterOperators$.subscribe((x) => {
        this.queryListRequest$.next({
          ...this.queryListRequest$.value,
          filterOperators: x,
        });
      })
    );

    this.subscriptions.push(
      this.inOperators$.subscribe((x) => {
        this.queryListRequest$.next({
          ...this.queryListRequest$.value,
          inOperators: x,
        });

        console.log(
          'this.queryListRequest$ changed: ',
          this.queryListRequest$.value
        );
      })
    );

    this.subscriptions.push(
      this.search$
        .pipe(
          debounceTime(500),
          distinctUntilChanged((prev, curr) => {
            let condition = false;
            if (!!prev || !!curr) {
              condition = JSON.stringify(prev) === JSON.stringify(curr);
            }
            return condition;
          })
        )
        .subscribe((x) => {
          this.queryListRequest$.next({
            ...this.queryListRequest$.value,
            search: !!x?.current
              ? JSON.parse(JSON.stringify(x?.current))
              : undefined,
          });
        })
    );

    this.subscriptions.push(
      this.sort$.subscribe((x) => {
        this.queryListRequest$.next({
          ...JSON.parse(JSON.stringify(this.queryListRequest$.value)),
          sort: JSON.parse(JSON.stringify(x)),
        });
      })
    );

    this.subscriptions.push(
      this.pagination$.subscribe((x) => {
        this.queryListRequest$.next({
          ...this.queryListRequest$.value,
          pagination: x,
        });
      })
    );

    this.subscriptions.push(
      this.corePageListService.instances
        .filter((x) => x.instanceNumber === this.corePageListInstanceNumber)[0]
        .reloadFlag$!.subscribe((x) => {
          console.log('this.forceReloadingFlag$ is being changed...', x);
          this.forceReloadingFlag$.next(x);
        })
    );

    this.subscriptions.push(
      this.forceReloadingFlag$.subscribe((x) => {
        this.queryListRequest$.next({
          ...this.queryListRequest$.value,
          forceReloadingFlag: x,
        });
      })
    );

    this.subscriptions.push(
      this.currentPage$
        .pipe(
          distinctUntilChanged() // IMPORTANT!
        )
        .subscribe((x) => {
          console.log("currentPage change to", x)
          this.queryListRequest$.next({
            ...this.queryListRequest$.value,
            pagination: {
              ...this.queryListRequest$.value?.pagination!,
              skip: (x - 1) * this.queryListRequest$.value?.pagination?.take!,
            },
          })
        })
    );

    /* END: Subscriptions for queryListRequest$ */

    // Quan trọng: CorePageList cần biết chính xác chiều cao
    // Tuy nhiên có nhiều trường hợp chiều cao này không được truyền vào khi triển khai
    // Xét trường hợp các form danh mục cơ bản
    // content-container => consume component => core-page-list => core-page-header => core-composition => topRef + table + pagination
    // ta có thể tính số mặc định (nếu height không được truyền vào)
    if (this.height === undefined) {
      this.subscriptions.push(
        this.layoutService.contentContainerHeight$.subscribe(x => {
          // basicSpacing là paddingBottom của lớp content-container
          this.height = x - this.layoutService.basicSpacing;
          this.height$.next(x - this.layoutService.basicSpacing)
        })
      )
    }

  }

  onRowDoubleClick(event: any) {
    if (!!this.seekerMode || !!this.mccMode || !!this.disableDoubleClick) {
      this.rowDoubleClick.emit(event);
    } else {
      if (!!!this.selfResolveCorePageHeaderButtonClick) {
        this.corePageEditService.fromUrl = this.router.url;
        if (!!this.normalMode) {
          if (!!this.hasIdOfStringType) {
            this.router.navigate(
              [
                btoa(event.id),
                { listInstance: this.corePageListInstanceNumber },
              ],
              {
                relativeTo: this.route.parent,
              }
            );
          } else {
            this.router.navigate(
              [
                btoa(event.id.toString()),
                { listInstance: this.corePageListInstanceNumber },
              ],
              {
                relativeTo: this.route.parent,
              }
            );
          }
        } else {
          if (!!this.hasIdOfStringType) {
            this.router.navigate(
              [
                {
                  outlets: {
                    corePageListAux: [
                      btoa(event.id),
                      { listInstance: this.corePageListInstanceNumber },
                    ],
                  },
                },
              ],
              { relativeTo: this.route }
            );
          } else {
            this.router.navigate(
              [
                {
                  outlets: {
                    corePageListAux: [
                      btoa(event.id.toString()),
                      { listInstance: this.corePageListInstanceNumber },
                    ],
                  },
                },
              ],
              { relativeTo: this.route }
            );
          }
        }
      } else {
        this.rowDoubleClick.emit(event);
      }
    }
  }

  onRowClick(e: any): void {
    console.log('CorPageList onRowClick e', e);
    if (!!e.id) {
      this.onChange(e.id);
    } else {
      this.alertService.error(
        "The 'id' columns is null. Please check why",
        noneAutoClosedAlertOptions
      );
    }
    this.rowClick.emit(e);
  }

  onToolClick(event: ICoreTableToolClickEventEmitterData) { }

  onSearching(e: ISearchItem[]): void {
    const prev = !!this.search$.value?.current
      ? JSON.parse(JSON.stringify(this.search$.value?.current))
      : null;
    this.search$.next({
      previous: prev!,
      current: e,
    });
  }

  private resizeHeightWhenContainerHasFixedHeight(): void {
    const containerHeight = this.height;
    const paginationHeight = Number(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--size-core-pagination-height')
        .replace('px', '')
    );
    const tableBorderTop = Number(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--size-core-table-border-top')
        .replace('px', '')
    );

    const blockCellSpacing = Number(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--size-layout-block-cell-spacing')
        .replace('px', '')
    );

    this.corePageListContainer.nativeElement.style.setProperty(
      '--height',
      containerHeight + 'px'
    );
    const relatedTableFilter = this.corePageListService.instances.filter(
      (x) => x.instanceNumber === this.corePageListInstanceNumber
    );
    if (!!relatedTableFilter.length) {
      const relatedTable = relatedTableFilter[0].coreTableRef;
      if (!!relatedTable) {
        console.log('Related CoreTableComponentRef FOUND!!!');
        //setTimeout(() => {
        const featureHeight =
          containerHeight -
          paginationHeight -
          tableBorderTop -
          2 * blockCellSpacing * 0 /* padding inclued in object itself */ -
          (this.extraManualOffset || 0);
        relatedTable.nativeElement.style.setProperty(
          '--height',
          featureHeight + 'px'
        );

        const firstHeaderRowHeight = Number(
          getComputedStyle(relatedTable.nativeElement)
            .getPropertyValue('--header-1st-row-height')
            .replace('px', '')
        );
        const secondHeaderRowHeight = Number(
          getComputedStyle(relatedTable.nativeElement)
            .getPropertyValue('--header-2nd-row-height')
            .replace('px', '')
        );

        const featureTbodyHeight =
          featureHeight - firstHeaderRowHeight - secondHeaderRowHeight;

        console.log('featureTbodyHeight', featureTbodyHeight);

        this.corePageListService.instances
          .filter(
            (x) => x.instanceNumber === this.corePageListInstanceNumber
          )[0]
          .tbodyHeight$.next(featureTbodyHeight);
        //});
      } else {
        console.error('Related CoreTableComponentRef was undefined');
      }

    } else {
      console.error('No related CoreTableComponentRef found');
    }
  }

  private resizeHeightWhenContainerHasUndefinedHeight(): void {

    const containerHeight = this.layoutService.contentContainerHeight$.value;
    const pageHeaderHeight = this.layoutService.corePageHeaderHeight;
    const paginationHeight = this.layoutService.corePaginationHeight;
    const tableBorderTop = this.layoutService.tableBorderTop;
    const basicSpacing = this.layoutService.basicSpacing;

    this.corePageListContainer.nativeElement.style.setProperty(
      '--height',
      containerHeight - 2 * basicSpacing + 'px'
    );
    const relatedTableFilter = this.corePageListService.instances.filter(
      (x) => x.instanceNumber === this.corePageListInstanceNumber
    );
    if (!!relatedTableFilter.length) {

      if (!!this.autoResizeWithWindow) {

        const relatedTable = relatedTableFilter[0].coreTableRef;
        if (!!relatedTable) {
          console.log('Related CoreTableComponentRef FOUND!!!');
          //setTimeout(() => {
          const featureHeight =
            containerHeight -
            pageHeaderHeight -
            paginationHeight -
            tableBorderTop -
            2 * basicSpacing -
            (this.extraManualOffset || 0);
          relatedTable.nativeElement.style.setProperty(
            '--height',
            featureHeight + 'px'
          );

          const firstHeaderRowHeight = Number(
            getComputedStyle(relatedTable.nativeElement)
              .getPropertyValue('--header-1st-row-height')
              .replace('px', '')
          );
          const secondHeaderRowHeight = Number(
            getComputedStyle(relatedTable.nativeElement)
              .getPropertyValue('--header-2nd-row-height')
              .replace('px', '')
          );

          const featureTbodyHeight =
            featureHeight - firstHeaderRowHeight - secondHeaderRowHeight;

          console.log('featureTbodyHeight', featureTbodyHeight);

          this.corePageListService.instances
            .filter(
              (x) => x.instanceNumber === this.corePageListInstanceNumber
            )[0]
            .tbodyHeight$.next(featureTbodyHeight);
          //});
        } else {
          console.error('Related CoreTableComponentRef was undefined');
        }


      }

    } else {
      console.error('No related CoreTableComponentRef found');
    }
  }

  private resizeHeight$(): Observable<any> {
    return new Observable(observer => {
      this.heightResizing = true;
      this.resizeHeight();
      this.heightResizing = false;
      observer.next(new Date().getTime())
    })
  }

  private resizeHeight(): void {
    if (!!!this.seekerMode) {
      /* #start EDITING CODE BLOCK BELLOW ONLY IF YOU KNOW ALL THE APP DESIGN FLOWS */
      /* ========================================================================== */
      if (!!this.height) {
        this.resizeHeightWhenContainerHasFixedHeight();
      } else {
        this.resizeHeightWhenContainerHasUndefinedHeight();
      }
    } else {
      // to do smth maybe
    }
    /* #end EDITING CODE BLOCK BELLOW ONLY IF YOU KNOW ALL THE APP DESIGN FLOWS */
  }

  queryListSubscribe(): void {
    if (!!!this.queryListSubscription && !!this.queryListStream$) {
      this.queryListSubscription = this.queryListStream$.subscribe(x => this.subscribeQueryList(x))
    }
  }

  calculateTableHeightBasedOnHeightAndTopRefHeight(height: number, topRefHeight: number): void {
    if (height === undefined || topRefHeight === undefined) return;
    this.compositionHeight = height - (!!this.hideHeader ? 0 : this.layoutService.corePageHeaderHeight);
    // (!topRefHeight ? 15 : 0) => Nếu có phần Top sẽ có thêm marginBottom 15px của nó.
    this.tableHeight = height - this.layoutService.corePageHeaderHeight - topRefHeight - this.layoutService.corePaginationHeight - (!!topRefHeight ? 15 : 0)  // 15px is marginBottom of topRef
  }

  ngAfterViewInit(): void {
    /** START setTimeout */
    setTimeout(() => {

      const tryFind = this.coreButtonGroupService.instances.filter(x => x.instanceNumber === this.corePageListInstanceNumber);
      if (!!tryFind.length) {
        this.buttonGroupStatus = tryFind[0];
        this.buttonGroupStatus.mustBeHidden$.next(EMPTY_SELECTION_HIDDEN_BUTTON)
      } else {
        if (isDevMode() && !(!this.seekerMode || !this.hideButtonGroup)) {
          this.alertService.warn("Không tìm thấy instance number của bộ nút điều khiển", noneAutoClosedAlertOptions)
        }
      }

      const compositionFilter = this.coreCompositionService.instances.filter(x => x.instanceNumber === this.corePageListInstanceNumber);
      if (!!compositionFilter.length) {
        this.subscriptions.push(
          compositionFilter[0].topRef$.subscribe(x => {
            this.topPlaceHeight$.next(x.nativeElement.getBoundingClientRect().height)
          })
        )
      }


      this.subscriptions.push(
        this.height$.subscribe(x => {
          this.calculateTableHeightBasedOnHeightAndTopRefHeight(x, this.topPlaceHeight$.value)
        })
      )

      this.subscriptions.push(
        this.topPlaceHeight$.subscribe(x => {
          this.calculateTableHeightBasedOnHeightAndTopRefHeight(this.height$.value, x)
        })
      )

      this.subscriptions.push(
        this.resizeHeightFlag$.pipe(
          switchMap(_ => {
            this.geometricDone = false;
            return this.resizeHeight$()
          })
        ).subscribe(x => {
          console.log("resizeHeightFlag$ switchMap final value", x)
          if (!!!this.heightResizing) this.geometricDone = true;
        })

      )
      // this.calculateTableHeight();

      if (!!this.showParamKit) {
        // setTimeout(() => {
        // calculating offset of the top
        const tryFindCoreHeaderParamsElement = document.querySelectorAll(
          '.core-header-params-container'
        );
        if (Array.from(tryFindCoreHeaderParamsElement).length === 1) {
          const item = Array.from(tryFindCoreHeaderParamsElement)[0];
          const rect = item.getBoundingClientRect();
          this.extraManualOffset = rect.height + 15; // mb15 is margin-bottom 15px of form row

          this.resizeHeightFlag$.next(!!!this.resizeHeightFlag$.value);

        } else {
          if (!!!this.extraManualOffset) this.extraManualOffset = 0;
        }

        this.resizeHeightFlag$.next(!!!this.resizeHeightFlag$.value);
      } else {
        if (!!!this.extraManualOffset) this.extraManualOffset = 0;
        this.resizeHeightFlag$.next(!!!this.resizeHeightFlag$.value);
      }

      const tryFilter = this.corePageListService.instances
        .filter((x) => x.instanceNumber === this.corePageListInstanceNumber);
      if (!!!tryFilter.length) {
        if (isDevMode()) {
          this.alertService.error(`CorePageList instances do not include number ${this.corePageListInstanceNumber}`, noneAutoClosedAlertOptions)
        }
      } else {
        this.subscriptions.push(
          this.corePageListService.instances
            .filter((x) => x.instanceNumber === this.corePageListInstanceNumber)[0]
            .id$.pipe(
              filter(_ => !!!this.idState)
            ).subscribe((x: any) => {

              console.log('corePageListService.instance id$ has changed, x = ', x);
              this.queryListRequest$.next({
                ...this.queryListRequest$.value,
                id: x,
              });
            })
        );
      }

      this.subscriptions.push( // outer-push
        this.dialogService.dialogConfirmed$.pipe(
          filter(i => !!!this.dialogService.busy && !!i?.confirmed && i.instanceNumber === this.dialogInstanceNumber)
        ).subscribe(() => {

          this.dialogService.resetService()

          switch (this.pendingAction) {
            case EnumCoreButtonVNSCode.HEADER_UPLOAD:
              console.log("Now uploading... ", this.dataImport);
              // this.subscriptions.push( // middem-push
              // )
              break;
            case EnumCoreButtonVNSCode.HEADER_DELETE:


              const sysMutationLogBeforeAfterRequest: ISysMutationLogBeforeAfterRequest = {
                sysFunctionCode: this.routingService.currentFunction$.value?.code!,
                sysActionCode: EnumCoreButtonVNSCode.HEADER_DELETE,
                before: JSON.stringify(this.selectedData),
                after: '""',
                username: this.authService.data$.value?.userName!
              }

              const request: IIdsRequest = {
                ids: this.selectedIds as number[],
                sysMutationLogBeforeAfterRequest
              };

              this.subscriptions.push(
                this.corePageListService
                  .deleteIds(request, this.crud.deleteIds!)
                  .subscribe((x) => {
                    if (x.ok && x.status === 200) {
                      const body: IFormatedResponse = x.body;
                      if (body.statusCode === 200 || x.body.statusCode == '200') {
                        this.forceReloadingFlag$.next(
                          !!!this.forceReloadingFlag$.value
                        );
                        request.ids = [];
                      } else if (body.statusCode === 400) {
                      }
                    }
                  })
              );
              break;
            case EnumCoreButtonVNSCode.HEADER_UNAPPROVE:
              const sysMutationLogBeforeAfterSendUnapprove: ISysMutationLogBeforeAfterRequest = {
                sysFunctionCode: this.routingService.currentFunction$.value?.code!,
                sysActionCode: EnumCoreButtonVNSCode.HEADER_UNAPPROVE,
                before: JSON.stringify(this.selectedData),
                after: '""',
                username: this.authService.data$.value?.userName!
              }

              const sendRequest: ITongleUnApproveIdsRequest = {
                reason: this.dialogService.reason$.value,
                ids: this.selectedIds as number[],
                valueToBind: false
              };

              this.subscriptions.push(
                this.appService
                  .post(this.crud.toggleUnapproveIds!, sendRequest)
                  .subscribe((x) => {
                    if (x.ok && x.status === 200) {
                      const body: IFormatedResponse = x.body;
                      if (body.statusCode === 200 || x.body.statusCode == '200') {
                        this.forceReloadingFlag$.next(
                          !!!this.forceReloadingFlag$.value
                        );
                        request.ids = [];
                      } else if (body.statusCode === 400) {
                      }
                    }
                  })
              );
              break;
            default:
              break;
          }
        })
      )


      if (this.autoResizeWithWindow) {
        this.subscriptions.push(
          this.resizeStream$.pipe(debounceTime(200)).subscribe((_: any) => {

            this.resizeHeightFlag$.next(!!!this.resizeHeightFlag$.value);

          })
        );
      }

      //setTimeout(() => {
      /* START: Subscription for list */

      this.queryListStream$ = this.queryListRequest$.pipe(
        map(x => {
          console.log("map x => ", x)
          const filter1Condition = !!x && /*!!x.sort && */ !!x.pagination
          console.log("map filter1Condition => ", filter1Condition)
          return x
        }),
        filter((x: IQueryListRequest) => !!x && /*!!x.sort && */ !!x.pagination),
        filter((_) => !this.pauseSubsctiption),
        distinctUntilChanged((prev, curr) => {
          /* START: Assimilation null and not-existing property */
          /*
                lang: string;
                generalSearch?: IGeneralSearch;
                sort?: ISortItem[];
                pagination?: IPagination;
                filter?: any;
                filterOperators?: IFilterOperator[];
                inOperators?: IInOperator[];
                search?: ISearchItem[];
                id?: number | string | null,
                forceReloadingFlag?: boolean;
            */

          //generalSearch
          if (!!!prev.generalSearch?.searchFor) prev.generalSearch = undefined;
          if (!!!curr.generalSearch?.searchFor) curr.generalSearch = undefined;

          // sort
          if (!!prev.sort) {
            if (prev.sort.length === 0) prev.sort = undefined;
          }
          if (!!curr.sort) {
            if (curr.sort.length === 0) curr.sort = undefined;
          }

          // search
          if (!!prev.search) {
            if (prev.search.length === 0) prev.search = undefined;
          }
          if (!!curr.search) {
            if (curr.search.length === 0) curr.search = undefined;
          }

          // id
          if (!!!prev.id) prev.id = null;
          if (!!!curr.id) curr.id = null;

          /* END: Assimilation null and not-existing property */

          const condition = JSON.stringify(prev) === JSON.stringify(curr);

          if (!!!condition) {
            console.group('COMPARISON');
            console.log('prev', prev);
            console.log('curr', curr);
            console.log('condition', condition);
            console.groupEnd();
          }
          return condition;
        }),
        /*
          /* START: use switchMap for cancellation
          */
        switchMap((x) => {
          console.group('switchMap triggered');
          console.log("x.id = ", x.id)
          console.groupEnd();
          this.loading = true;
          const url = this.apiDefinition.queryListRelativePath + "?computingWithLocalTimeZone=true";
          return this.corePageListService.queryList(x, url);
        })
        /*
        /* END: use switchMap for cancellation
        */
      );

      this.queryListSubscribe();

      /* END: Subscription for list */
      //});
    })

    setTimeout(() => this.resizeHeightFlag$.next(!!!this.resizeHeightFlag$.value), 500)

    /** END setTimeout*/
  }

  onParamKitValueChange(data: ICoreCommonParamKitEventEmitterData): void {
    switch (data.field) {
      case 'generalSearch':
        this.generalSearch$.next(data.value);
        break;
      case 'dateFrom':
        const newFromFilterOperators: IFilterOperator[] = JSON.parse(
          JSON.stringify(this.filterOperators$.value)
        );
        const filterFrom = newFromFilterOperators.filter(
          (x) =>
            x.field === this.datePeriodComparisonFor &&
            x.operator === EnumFilterOperator.GREATER_THAN_OR_EQUAL
        );
        if (filterFrom.length === 1) {
          if (!!data.value) {
            filterFrom[0].dateTimeValue = new Date(
              (data.value as Date).setHours(0, 0, 0, 0)
            );
          } else {
            filterFrom[0].dateTimeValue = null;
          }
        } else if (filterFrom.length === 0) {
          if (!!data.value) {
            newFromFilterOperators.push({
              field: this.datePeriodComparisonFor,
              operator: EnumFilterOperator.GREATER_THAN_OR_EQUAL,
              dateTimeValue: new Date(
                (data.value as Date).setHours(0, 0, 0, 0)
              ),
            });
          }
        } else {
          this.alertService.error(
            `FilterOperators error for ${data.field}: combination of field name and operator name is not unique in the array`
          );
        }

        this.filterOperators$.next(newFromFilterOperators);

        break;
      case 'dateTo':
        const newToFilterOperators: IFilterOperator[] = JSON.parse(
          JSON.stringify(this.filterOperators$.value)
        );
        const filterTo = newToFilterOperators.filter(
          (x) =>
            x.field === this.datePeriodComparisonFor &&
            x.operator === EnumFilterOperator.LESS_THAN_OR_EQUAL
        );
        if (filterTo.length === 1) {
          if (!!data.value) {
            filterTo[0].dateTimeValue = new Date(
              (data.value as Date).setHours(23, 59, 59, 999)
            );
          } else {
            filterTo[0].dateTimeValue = null;
          }
        } else if (filterTo.length === 0) {
          if (!!data.value) {
            newToFilterOperators.push({
              field: this.datePeriodComparisonFor,
              operator: EnumFilterOperator.LESS_THAN_OR_EQUAL,
              dateTimeValue: new Date(
                (data.value as Date).setHours(23, 59, 59, 999)
              ),
            });
          }
        } else {
          this.alertService.error(
            `FilterOperators error for ${data.field}: combination of field name and operator name is not unique in the array`
          );
        }

        this.filterOperators$.next(newToFilterOperators);

        break;
      case 'statusIds':
        const newInOperators: IInOperator[] = JSON.parse(
          JSON.stringify(this.inOperators$.value)
        );
        const infilter = newInOperators.filter(
          (x) => x.field === this.statusInclusionFor
        );
        if (infilter.length === 1) {
          infilter[0].values = data.value;
        } else if (infilter.length === 0) {
          newInOperators.push({
            field: this.statusInclusionFor,
            values: data.value,
          });
        } else {
          this.alertService.error(
            `InOperators error for ${data.field}: field name is not unique in the array`
          );
        }

        this.inOperators$.next(newInOperators);

        break;
      default:
        break;
    }
  }

  exportToExcel(): void {
    /* Phương pháp xuất CSV */
    /* Cần thay bằng xuất EXCEL bằng Backend */
    /*
    const csvData: any[][] = [];

    let row1: any[] = [];
    this.columns = this.columns.filter((x) => x.field != 'id');
    console.log(this.columns)
    this.columns.map((x) => {
      row1.push(this.mls.trans(x.caption));
    });
    csvData.push(row1);

    this.list.map((row, index) => {
      const currentRow: any[] = [];
      this.columns.map((column) => {
        if (column.field != 'id') {
          let currentCell = row[column.field];
          if (typeof currentCell?.replaceAll === 'function') {
            currentCell = currentCell.replaceAll(',', ';');
          }
          currentRow.push(currentCell);
        }
      });

      csvData.push(currentRow);
    });

    let csvContent = csvData.map((e) => e.join(',')).join('\n');

    var link = document.createElement('a');
    link.setAttribute(
      'href',
      'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvContent)
    );
    link.setAttribute('download', 'ExportExel.csv');
    document.body.appendChild(link);
    link.click();
    */
    /*
    Bắt đầu xuất Excel bằng Backend
    */

    // Thu thập nhiên liệu

    if (!this.innerBodyCount$.value) {
      this.alertService.info(this.mls.trans('XLSX_NO_RESULT_TO_EXPORT'), alertOptions);
      return;
    }

    const url = this.apiDefinition.queryListRelativePath;
    const x = this.queryListRequest$.value; // Cần loại bỏ paging khỏi đối tượng này

    x.pagination = {
      skip: 0,
      take: this.innerBodyCount$.value
    }

    let apiStream$: Observable<any>;
    // Nếu có dòng dữ liệu checked thì chỉ xuất các dòng này
    if (!!this.selectedData.length) {
      apiStream$ = new Observable<any>(observer => {
        observer.next({
          ok: true,
          status: 200,
          body: {
            statusCode: 200,
            innerBody: {
              list: this.selectedData
            }
          }
        })
      });
    } else {
      // Trái lại, xuất 100% sau khi đã lọc (toàn bộ các trang)
      apiStream$ = this.corePageListService.queryList(x, url + "?computingWithLocalTimeZone=true");
    }



    // It's time to subscribe apiStream$
    this.prefetchLoading = true;
    this.subscriptions.push(
      apiStream$.subscribe(x => {
        this.prefetchLoading = false;
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200) {
            //this.alertService.success(`${body.innerBody.count} rows of data fetched. It is time to do with backend excel exporting`, alertOptions)

            const apiPoint = api.XLSX_EXPORT_CORE_PAGE_LIST_TO_EXCEL;
            const flatColumns: ICoreTableFlatColumnItem[] = [];

            this.columns.filter(x => !x.hidden).map(c => {
              flatColumns.push(
                {
                  caption: c.caption,
                  field: c.field,
                  type: c.type,
                  pipe: c.pipe,
                  align: c.align,
                  width: c.width,
                  hidden: c.hidden
                }
              )
            })

            const flatData: any[] = [];
            const keys: string[] = [];
            flatColumns.map(c => keys.push(c.field));
            body.innerBody.list.map((row: any) => {
              const e: any = {};
              keys.map(k => {
                e[k] = row[k];
              })
              flatData.push(e);
            })

            const obj = {
              columns: flatColumns,
              data: flatData
            }

            const payload = this.jsonService.stringify(obj);

            this.longApiRunning = true;

            this.exportCorePageListGridToExcelSubscription = this.appService.blobPost(apiPoint, payload).subscribe(response => {
              this.longApiRunning = false;
              if (response.body.statusCode === 400) return

              let downloadLink = document.createElement("a");
              downloadLink.href = window.URL.createObjectURL(new Blob([response.body]))
              downloadLink.setAttribute("download", this.mls.trans(this.title) + ".xlsx");
              document.body.appendChild(downloadLink);
              downloadLink.click();
            })


          }
        }
      })
    )

  }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    this.corePageHeaderButtonClick.emit(e);

    switch (e.code) {

      case EnumCoreButtonVNSCode.HEADER_CREATE:

        if (!!!this.selfResolveCorePageHeaderButtonClick) {

          this.corePageEditService.fromUrl = this.router.url;

          if (this.normalMode) {

            this.router.navigate(
              [btoa('0'), { listInstance: this.corePageListInstanceNumber }],
              {
                relativeTo: this.route.parent,
              }
            );
          } else {
            this.router.navigate(
              [
                {
                  outlets: {
                    corePageListAux: [
                      btoa('0'),
                      { listInstance: this.corePageListInstanceNumber },
                    ],
                  },
                },
              ],
              { relativeTo: this.route }
            );
          }
        }

        break;
      case EnumCoreButtonVNSCode.HEADER_EDIT:
        if (!!!this.selfResolveCorePageHeaderButtonClick) {

          this.corePageEditService.fromUrl = this.router.url;
          if (this.selectedIds.length > 1) {
            this.alertService.error(this.mls.trans('SELECT_ONLY_ONE_RECORD_TO_EDIT'), alertOptions);
          }
          else {
            if (this.selectedIds.length == 1) {
              if (!!this.normalMode) {

                this.router.navigate(
                  [btoa('' + this.selectedIds[0]), { listInstance: this.corePageListInstanceNumber }],
                  {
                    relativeTo: this.route.parent,
                  }
                );
              } else {
                this.router.navigate(
                  [
                    {
                      outlets: {
                        corePageListAux: [
                          btoa('' + this.selectedIds[0]),
                          { listInstance: this.corePageListInstanceNumber },
                        ],
                      },
                    },
                  ],
                  { relativeTo: this.route }
                );
              }
            } else {
              this.alertService.error(this.mls.trans('NO_SELECTED_ID_TO_EDIT'), alertOptions);
            }
          }
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_ACTIVATE:
        if (!!this.selectedIds.length) {
          if (
            typeof this.selectedIds[0] !== 'number'
          ) {
            this.alertService.info(
              this.mls.trans(
                EnumTranslateKey.CORE_PAGE_LIST_ACTIVE_IDS_METHOD_SUPORTS_ONLY_NUMBER_TYPE
              )
            );
            break;
          }
        } else {
          this.alertService.error(
            this.mls.trans('NO_SELECTED_ID_TO_ACTIVATE'),
            alertOptions
          );
          break;
        }
        const request: IToggleActiveIdsRequest = {
          valueToBind: true,
          ids: this.selectedIds as number[],
        };
        const confirmActive = window.confirm(
          this.mls.trans('common.confirm.delete.active.prefix') +
          JSON.stringify(this.selectedIds) +
          '?'
        );
        if (confirmActive) {
          if (!!this.crud.toggleActiveIds) {
            this.subscriptions.push(
              this.appService.post(this.crud.toggleActiveIds, request)
                .subscribe((x) => {
                  if (x.ok && x.status === 200) {
                    const body: IFormatedResponse = x.body;
                    if (body.statusCode === 200 || x.body.statusCode == '200') {
                      this.forceReloadingFlag$.next(
                        !!!this.forceReloadingFlag$.value
                      );
                      this.selectedIds = []
                    }
                  }
                })
            );
          } else {
            if (isDevMode()) {
              this.alertService.warn(this.mls.trans(EnumTranslateKey.NO_API_END_POINT_PROVIDED_FOR_ACTIVATION), noneAutoClosedAlertOptions)
            }
          }
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_INACTIVATE:
        if (!!this.selectedIds.length) {
          if (
            typeof this.selectedIds[0] !== 'number'
          ) {
            this.alertService.info(
              this.mls.trans(
                EnumTranslateKey.CORE_PAGE_LIST_INACTIVE_IDS_METHOD_SUPORTS_ONLY_NUMBER_TYPE
              )
            );
            break;
          }
        } else {
          this.alertService.error(
            this.mls.trans('NO_SELECTED_ID_TO_INACTIVATE'),
            alertOptions
          );
          break;
        }
        const payload: IToggleActiveIdsRequest = {
          valueToBind: false,
          ids: this.selectedIds as number[],
        };
        const confirmInactive = window.confirm(
          this.mls.trans('common.confirm.delete.inactive.prefix') +
          JSON.stringify(this.selectedIds) +
          '?'
        );
        if (confirmInactive) {
          if (!!this.crud.toggleActiveIds) {
            this.subscriptions.push(
              this.appService.post(this.crud.toggleActiveIds, payload)
                .subscribe((x) => {
                  if (x.ok && x.status === 200) {
                    const body: IFormatedResponse = x.body;
                    if (body.statusCode === 200 || x.body.statusCode == '200') {
                      this.selectedIds = []
                      this.forceReloadingFlag$.next(
                        !!!this.forceReloadingFlag$.value
                      );
                    }
                  }
                })
            );
          } else {
            if (isDevMode()) {
              this.alertService.warn(this.mls.trans(EnumTranslateKey.NO_API_END_POINT_PROVIDED_FOR_ACTIVATION), noneAutoClosedAlertOptions)
            }
          }
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_DELETE:
        if (!!this.selectedIds.length) {
          if (
            typeof this.selectedIds[0] !== 'number' &&
            typeof this.selectedIds[0] !== 'string'
          ) {
            this.alertService.info(
              this.mls.trans(
                'CORE_PAGE_LIST_DELETE_IDS_METHOD_SUPORTS_ONLY_NUMBER_AND_STRING_TYPES'
              )
            );
            break;
          }
        } else {
          this.alertService.error(
            this.mls.trans('NO_SELECTED_ID_TO_DELETE'),
            alertOptions
          );
          break;
        }

        if (!!this.deleteValidateFn) {

          const validated: boolean = this.deleteValidateFn(this.selectedData);
          if (!!!validated) return;
        }

        this.pendingAction = EnumCoreButtonVNSCode.HEADER_DELETE
        this.dialogService.title$.next(EnumTranslateKey.UI_CORE_DIALOG_SERVICE_CONFIRMATION)
        this.dialogService.okButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CONFIRM)
        this.dialogService.cancelButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CANCEL)
        this.dialogService.showCancelOnly$.next(false);
        this.dialogService.busy = true;
        this.dialogService.body$.next(EnumTranslateKey.UI_CORE_DIALOG_SERVICE_ARE_YOU_SURE_TO_DELETE);
        let listDeleteIds: any[] = [];
        this.selectedData.forEach(x => {
          listDeleteIds.push(x[this.columns[1].field])
        });
        this.dialogService.informationLines$.next(listDeleteIds)
        this.dialogService.showConfirmDialog$.next(true);

        break;

      case EnumCoreButtonVNSCode.HEADER_UNAPPROVE:
        if (!!this.selectedIds.length) {
          if (
            typeof this.selectedIds[0] !== 'number' &&
            typeof this.selectedIds[0] !== 'string'
          ) {
            this.alertService.info(
              this.mls.trans(
                'CORE_PAGE_LIST_DELETE_IDS_METHOD_SUPORTS_ONLY_NUMBER_AND_STRING_TYPES'
              )
            );
            break;
          }
        } else {
          this.alertService.error(
            this.mls.trans('NO_SELECTED_ID_TO_DELETE'),
            alertOptions
          );
          break;
        }

        if (!!this.deleteValidateFn) {

          const validated: boolean = this.deleteValidateFn(this.selectedData);
          if (!!!validated) return;
        }

        this.pendingAction = EnumCoreButtonVNSCode.HEADER_UNAPPROVE
        // this.dialogService.title$.next(EnumTranslateKey.UI_CORE_DIALOG_SERVICE_CONFIRMATION)
        this.dialogService.okButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CONFIRM)
        this.dialogService.cancelButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CANCEL)
        this.dialogService.showCancelOnly$.next(false);
        this.dialogService.busy = true;
        this.dialogService.body$.next(EnumTranslateKey.UI_CORE_DIALOG_SERVICE_ARE_YOU_UNAPPROVE_INPUT_REASON);
        this.dialogService.showingUp$.next(true)
        this.dialogService.showConfirmDialog$.next(true);
        break;
      case EnumCoreButtonVNSCode.HEADER_APPROVE:
        if (!!this.selectedIds.length) {
          if (
            typeof this.selectedIds[0] !== 'number'
          ) {
            this.alertService.info(
              this.mls.trans(
                EnumTranslateKey.CORE_PAGE_LIST_ACTIVE_IDS_METHOD_SUPORTS_ONLY_NUMBER_TYPE
              )
            );
            break;
          }
        } else {
          this.alertService.error(
            this.mls.trans('NO_SELECTED_ID_TO_APPROVE'),
            alertOptions
          );
          break;
        }
        const requestApprove: IToggleApproveIdsRequest = {
          valueToBind: true,
          ids: this.selectedIds as number[],
        };
        const confirmApprove = window.confirm(
          this.mls.trans('common.confirm.approve.prefix') +
          JSON.stringify(this.selectedIds) +
          '?'
        );
        if (confirmApprove) {
          if (!!this.crud.toggleApproveIds) {
            this.subscriptions.push(
              this.appService.post(this.crud.toggleApproveIds, requestApprove)
                .subscribe((x) => {
                  if (x.ok && x.status === 200) {
                    const body: IFormatedResponse = x.body;
                    if (body.statusCode === 200 || x.body.statusCode == '200') {
                      this.forceReloadingFlag$.next(
                        !!!this.forceReloadingFlag$.value
                      );
                      request.ids = [];
                    }
                  }
                })
            );
          } else {
            if (isDevMode()) {
              this.alertService.warn(this.mls.trans(EnumTranslateKey.NO_API_END_POINT_PROVIDED_FOR_ACTIVATION), noneAutoClosedAlertOptions)
            }
          }
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_PENDING_APPROVE:
        if (!!this.selectedIds.length) {
          if (
            typeof this.selectedIds[0] !== 'number'
          ) {
            this.alertService.info(
              this.mls.trans(
                EnumTranslateKey.CORE_PAGE_LIST_ACTIVE_IDS_METHOD_SUPORTS_ONLY_NUMBER_TYPE
              )
            );
            break;
          }
        } else {
          this.alertService.error(
            this.mls.trans('NO_SELECTED_ID_TO_PENDING_APPROVE'),
            alertOptions
          );
          break;
        }
        const requestPendingApprove: IToggleApproveIdsRequest = {
          valueToBind: false,
          ids: this.selectedIds as number[],
        };
        const confirmPendingApprove = window.confirm(
          this.mls.trans('common.confirm.pending.approve.prefix') +
          JSON.stringify(this.selectedIds) +
          '?'
        );
        if (confirmPendingApprove) {
          if (!!this.crud.toggleApproveIds) {
            this.subscriptions.push(
              this.appService.post(this.crud.toggleApproveIds, requestPendingApprove)
                .subscribe((x) => {
                  if (x.ok && x.status === 200) {
                    const body: IFormatedResponse = x.body;
                    if (body.statusCode === 200 || x.body.statusCode == '200') {
                      this.forceReloadingFlag$.next(
                        !!!this.forceReloadingFlag$.value
                      );
                      request.ids = [];
                    }
                  }
                })
            );
          } else {
            if (isDevMode()) {
              this.alertService.warn(this.mls.trans(EnumTranslateKey.NO_API_END_POINT_PROVIDED_FOR_ACTIVATION), noneAutoClosedAlertOptions)
            }
          }
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_UNAPPROVE:
        break;
      case EnumCoreButtonVNSCode.HEADER_EXPORTEXEL:

        this.exportToExcel();
        break;
      case EnumCoreButtonVNSCode.HEADER_DOWNLOAD:
        const now = new Date().getTime();
        console.log("HEADER_DOWNLOAD clicked", now);
        if (window.location.href.indexOf(`import-salary-backdate`)! < 0
          && window.location.href.indexOf(`salary-import`)! < 0
          && window.location.href.indexOf(`import-add`)! < 0
          && window.location.href.indexOf(`import-monthly-tax`)! < 0
          && window.location.href.indexOf(`shiftsort`)! < 0
          && window.location.href.indexOf(`declaresunper`)! < 0
          && window.location.href.indexOf(`registerleave`)! < 0
          && window.location.href.indexOf(`overtime`)! < 0
          && window.location.href.indexOf(`import-tax-annual`)! < 0
          && window.location.href.indexOf(`cms/profile/list/evaluate`)! < 0
        ) {
          this.clickGenerateTemplate$.next(now);
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_UPLOAD:
        if (window.location.href.indexOf(`cms/profile/list/evaluate`) >= 0) {
          this.corePageHeaderButtonClick.emit(e)
        } else {
          this.browseFileInput();
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_LOCK:
      case EnumCoreButtonVNSCode.HEADER_UNLOCK:
        this.buttonGroupStatus.mustBeHidden$.next(EMPTY_SELECTION_HIDDEN_BUTTON)
        this.corePageHeaderButtonClick.emit(e)
        break;
      default:
        console.log(e.code)
        break;
    }
  }

  onSelectedIdsChange(e: string[] | number[]) {
    this.selectedIds = e;
    this.selectedIdsChange.emit(e);
  }

  onSelectedDataChange(e: any[]) {
    this.selectedData = e;
    this.selectedDataChange.emit(e);
    if (!!e.length) {
      if (e.length > 1) {
        this.buttonGroupStatus.mustBeHidden$.next([
          EnumCoreButtonVNSCode.HEADER_EDIT,
          EnumCoreButtonVNSCode.HEADER_LIQUIDATE_CONTRACT
        ])
      }
      else {
        if (!!e[0].isLock) {
          this.buttonGroupStatus.mustBeHidden$.next([EnumCoreButtonVNSCode.HEADER_LOCK])
        } else {
          this.buttonGroupStatus.mustBeHidden$.next([EnumCoreButtonVNSCode.HEADER_UNLOCK])
        }

      }
    } else {
      this.buttonGroupStatus.mustBeHidden$.next(EMPTY_SELECTION_HIDDEN_BUTTON)
    }

  }

  onColumnCaptionClick(e: ICoreTableColumnItem) {
    const newSort: ISortItem[] = JSON.parse(JSON.stringify(this.sort$.value));
    newSort.map((c) => {
      if (c.field === e.field) {
        if (c.sortDirection === EnumSortDirection.NONE) {
          c.sortDirection = EnumSortDirection.ASC;
        } else if (c.sortDirection === EnumSortDirection.ASC) {
          c.sortDirection = EnumSortDirection.DESC;
        } else {
          c.sortDirection = EnumSortDirection.NONE;
        }
      } else {
        c.sortDirection = EnumSortDirection.NONE;
      }
    });
    this.sort$.next(newSort);
  }

  inputFile = async (e: any) => {
    console.log("inputFile e", e)
    const files = e.target.files;
    const file = files[0];
    let fileName = file.name;

    const blob = new Blob([file]);

    blobToBase64(blob).then((base64: any) => {
      this.onInputFileBase64DataReady.emit(base64);

      // Nếu tham số generateTemplateRequest được truyền vào
      // Import sẽ thực thi theo quy trình Core
      if (this.generateTemplateRequest) {
        const importXlsxToDbRequest: IImportXlsxToDbRequest = {
          fileName,
          exCode: this.generateTemplateRequest.exCode,
          base64String: base64
        }
        this.longApiRunning = true;
        this.subscriptions.push(
          this.corePageListService.importXlsxToDb(importXlsxToDbRequest).subscribe(x => {
            const session = Number(this.longTaskService.data$.value?.outerMessage);
            this.longApiRunning = false;
            if (x.ok && x.status === 200) {
              let downloadLink = document.createElement("a");
              downloadLink.href = window.URL.createObjectURL(new Blob([x.body]))
              fileName = fileName.split(".xlsx")[0] + "_processed_" + new Date().getTime() + ".xlsx";
              downloadLink.setAttribute("download", fileName);
              document.body.appendChild(downloadLink);
              downloadLink.click();

              const importPreviewOuterParam: IXlsxImportObject = {
                xlsxSid: this.authService.data$.value?.id!,
                xlsxExCode: this.generateTemplateRequest.exCode,
                xlsxSession: session
              }

              if (!!!this.importPreviewPath) {

                if (isDevMode()) {
                  this.alertService.error("'importPreviewPath' input property was missing!", noneAutoClosedAlertOptions);
                }

              } else {


                this.router.navigate(
                  [
                    {
                      outlets: {
                        corePageListAux: [
                          this.importPreviewPath,
                          { listInstance: this.corePageListInstanceNumber },
                        ],
                      },
                    },
                  ],
                  {
                    relativeTo: this.route, state: {
                      session,
                      importPreviewOuterParam
                    }
                  }
                );

              }
            }
          })
        )

      }

    });


  };

  browseFileInput(): void {
    console.log("browseFileInput")
    this.fileImport.nativeElement.value = null;
    this.fileImport.nativeElement.click();
  }

  onProgressWindowClose(_: any) {
    this.longApiRunning = false;
    this.exportCorePageListGridToExcelSubscription?.unsubscribe()
  }

  ngOnDestroy(): void {
    this.subscriptions.map((x) => x?.unsubscribe());
    if (!!this.queryListSubscription) this.queryListSubscription.unsubscribe();
  }
}
