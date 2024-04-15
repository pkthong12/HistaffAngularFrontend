import { Component, ElementRef, Input, OnDestroy, OnInit, AfterViewInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ICoreTableColumnItem, ICoreTableToolItem } from '../../core-table/core-table.component';

import { EnumSortDirection, IFilterOperator, IPagination, IQueryListRequest, ISearchItem, ISortItem } from 'src/app/interfaces/IQueryListRequest';
import { defaultPaging } from 'src/app/constants/defaultPaging';

import { CorePageListService } from '../../core-page-list/core-page-list.service';
import { CorePageEditService } from '../../core-page-edit/core-page-edit.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { AlertService } from '../../alert/alert.service';
import { LayoutService } from 'src/app/services/layout.service';
import { CoreButtonGroupService, ICoreButtonGroupStatus } from '../../core-button-group-vns/core-button-group-service';

import { BehaviorSubject, Subscription, debounceTime, distinctUntilChanged, filter, fromEvent, switchMap } from 'rxjs';
import { CorePageListState } from '../../core-page-list/core-page-list.state';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { IQueryListResponse } from 'src/app/interfaces/IQueryListResponse';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';

import { ICorePageListApiDefinition, ICorePageListSearchObject } from '../../core-page-list/core-page-list.component';
import { CoreFormControlBaseComponent } from '../../core-form-control-base/core-form-control-base.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'core-page-list-content',
  templateUrl: './core-page-list-content.component.html',
  styleUrls: ['./core-page-list-content.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CorePageListContentComponent
    },
    CorePageListState
  ]
})
export class CorePageListContentComponent extends CoreFormControlBaseComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {

  /* START: Some routed components, such as StaffProfile, may be reused as readonly for seeking */
  @Input() height!: number;
  @Input() isHeightForTable!: boolean;
  /* END: Some routed components, such as StaffProfile, may be reused as readonly for seeking */

    /* change these 2 props to wrap header texts */
    @Input() headerWrap!: boolean;
    @Input() headerFirstRowHeight!: number;
    /** */

  @Input() rowHeight!: string;
  @Input() wrap!: boolean;
  @Input() title!: EnumTranslateKey;
  @Input() hasIdOfStringType!: boolean;
  @Input() hideCheck!: boolean;
  @Input() apiDefinition!: ICorePageListApiDefinition;
  @Input() columns!: ICoreTableColumnItem[];
  @Input() inlineTools!: ICoreTableToolItem[];
  @Input() autoResizeWithWindow!: boolean;
  @Input() extraManualOffset!: number;
  @Input() disableHighlightOnClick!: boolean;
  @Input() columnSearchDefaultOpen!: boolean;
  @Input() outerParam$!: BehaviorSubject<any>;
  @Input() loading!: boolean;
  @Input() frozen!: number;
  @Input() fixedPageSize!: number;

  @ViewChild('corePageListContentContainer') corePageListContentContainer!: ElementRef;
  @ViewChild('paginationContainer') paginationContainer!: ElementRef;

  innerBodyCount$ = new BehaviorSubject<number>(1);

  tableHeight!: number;

  paginationHeight!: number;
  corePageListInstanceNumber!: number;

  resizeStream$ = fromEvent(window, 'resize');

  subscriptions: Subscription[] = [];

  selectedIds: string[] | number[] = [];

  isAdmin: boolean = false;

  /* start: passing this var to Pagination */

  pageCount!: number;

  // Passing BehaviorSubject to other component is like using a service (that holds this BehaviorSubject) injected to both components
  currentPage$ = new BehaviorSubject<number>(1);

  // Sometime we need to correct the page number of Pagination component without refreshing grid list by API call
  suspendCurrentPageSubscription$ = new BehaviorSubject<boolean>(false);

  /* end: passing this var to Pagination */

  pageSize$ = new BehaviorSubject<number>(defaultPaging.take);

  filter$ = new BehaviorSubject<any>(null);
  filterOperators$ = new BehaviorSubject<IFilterOperator[]>([]);
  search$ = new BehaviorSubject<ICorePageListSearchObject | null>(null);
  sort$ = new BehaviorSubject<ISortItem[]>([]);
  pagination$ = new BehaviorSubject<IPagination>({ skip: 0, take: defaultPaging.take })
  forceReloadingFlag$ = new BehaviorSubject<boolean>(false);
  queryListRequest$ = new BehaviorSubject<IQueryListRequest>({ lang: 'vi' });
  queryListSubscription!: Subscription;

  pauseSubsctiption: boolean = false;

  list!: any[];

  constructor(
    private corePageListService: CorePageListService,
    private corePageListState: CorePageListState,
    private corePageEditService: CorePageEditService,
    private router: Router,
    private route: ActivatedRoute,
    private mls: MultiLanguageService,
    private alertService: AlertService,
    public layoutService: LayoutService,
    private coreButtonGroupService: CoreButtonGroupService
  ) {

    super();

    //if (!!!this.composition) this.composition = EnumComposition.NONE
    this.corePageListInstanceNumber = new Date().getTime();
    this.corePageListService.instances.push({
      instanceNumber: this.corePageListInstanceNumber,
      reloadFlag$: new BehaviorSubject<boolean>(false),
      id$: new BehaviorSubject<any>(null),
      tbodyHeight$: new BehaviorSubject<any>(null),
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['height']) {
      this.tableHeight = changes['height'].currentValue - this.layoutService.corePaginationHeight
    }
  }

  ngOnInit(): void {

    if (!!this.fixedPageSize) {
      this.pageSize$.next(this.fixedPageSize);
    }

    // set default sort direction
    const newSort: ISortItem[] = [];
    this.columns.map(c => {
      newSort.push({
        field: c.field,
        sortDirection: EnumSortDirection.NONE
      })
    })
    this.sort$.next(newSort);

    /* START: Subscriptions for queryListRequest$ */

    this.subscriptions.push(
      this.mls.lang$.subscribe(x => {
        this.queryListRequest$.next({
          ...this.queryListRequest$.value,
          lang: x
        })
      })
    )

    if (!!this.outerParam$) {
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

    this.subscriptions.push(
      this.filter$.subscribe(x => {
        this.queryListRequest$.next({
          ...this.queryListRequest$.value,
          filter: x
        })
      })
    )

    this.subscriptions.push(
      this.filterOperators$.subscribe(x => {
        this.queryListRequest$.next({
          ...this.queryListRequest$.value,
          filterOperators: x
        })
      })
    )

    this.subscriptions.push(
      this.search$.pipe(
        debounceTime(500),
        distinctUntilChanged((prev, curr) => {
          let condition = false;
          if (!!prev || !!curr) {
            condition = JSON.stringify(prev) === JSON.stringify(curr)
          }
          return condition;
        })
      ).subscribe(x => {
        this.queryListRequest$.next({
          ...this.queryListRequest$.value,
          search: !!x?.current ? JSON.parse(JSON.stringify(x?.current)) : null
        })
      })
    )

    this.subscriptions.push(
      this.sort$.subscribe(x => {
        this.queryListRequest$.next({
          ...JSON.parse(JSON.stringify(this.queryListRequest$.value)),
          sort: JSON.parse(JSON.stringify(x))
        })
      })
    )

    this.subscriptions.push(
      this.corePageListState.id$.subscribe((x: any) => {
        console.log("corePageListState.id$ has changed")
        this.queryListRequest$.next({
          ...this.queryListRequest$.value,
          id: x
        })
      })
    )

    this.subscriptions.push(
      this.pageSize$.subscribe(x => {
        this.pagination$.next({
          ...this.pagination$.value,
          skip: 0,
          take: x
        })
      })
    )

    this.subscriptions.push(
      this.pagination$.subscribe(x => {
        this.queryListRequest$.next({
          ...this.queryListRequest$.value,
          pagination: x
        })
      })
    )

    this.subscriptions.push(
      this.corePageListService.instances.filter(x => x.instanceNumber === this.corePageListInstanceNumber)[0].reloadFlag$!.subscribe(x => {
        this.forceReloadingFlag$.next(x);
      })
    )

    this.subscriptions.push(
      this.forceReloadingFlag$.subscribe(x => {
        this.queryListRequest$.next({
          ...this.queryListRequest$.value,
          forceReloadingFlag: x
        })
      })
    )

    this.subscriptions.push(
      this.currentPage$.pipe(
        filter(_ => !!!this.suspendCurrentPageSubscription$.value),
        distinctUntilChanged() // IMPORTANT!
      )
        .subscribe(x => this.queryListRequest$.next({
          ...this.queryListRequest$.value,
          pagination: {
            ...this.queryListRequest$.value?.pagination!,
            skip: (x - 1) * this.queryListRequest$.value?.pagination?.take!
          }
        }))
    )

    /* END: Subscriptions for queryListRequest$ */

    /* START: Subscription for list */
    this.subscriptions.push(

      this.queryListRequest$.pipe(
        filter((x: any) => !!x && !!x.sort && !!x.pagination),
        filter(_ => !this.pauseSubsctiption),
        distinctUntilChanged((prev, curr) => {
          const condition = (JSON.stringify(prev) === JSON.stringify(curr))
          return condition;
        }),
        /*
        /* START: use switchMap for cancellation
        */
        switchMap(x => {
          console.log("switchMap x", x)
          this.loading = true;
          const url = this.apiDefinition.queryListRelativePath;
          return this.corePageListService.queryList(x, url)
        })
        /*
        /* END: use switchMap for cancellation
        */

      ).subscribe((x: any) => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body
          //this.responseService.resolve(body);

          if (body.statusCode === 200) {
            const innerBody: IQueryListResponse = body.innerBody;
            if (!!innerBody) {

              this.list = innerBody.list!;
              this.innerBodyCount$.next(innerBody.count!);
              this.pageCount = Math.ceil(innerBody.count! / this.pageSize$.value);

              /* Trickily reset id$ */
              this.pauseSubsctiption = true;
              if (!!this.corePageListState.id$.value) this.corePageListState.id$.next(null);
              setTimeout(() => this.pauseSubsctiption = false);

              if (innerBody.page !== this.currentPage$.value) {

                this.suspendCurrentPageSubscription$.next(true);
                this.currentPage$.next(innerBody.page!)

              }
            } else {
              this.list = [];
              this.pageCount = 0;
            }

          } else {
            this.list = [];
            this.pageCount = 0;
          }
        } else {
          //this.alertService.error(JSON.stringify(JSON.stringify(x, null, 2)), alertOptions);
        }

        this.loading = false;

      })
    )
    /* END: Subscriptions for list */

  }

  onSearching(e: ISearchItem[]): void {
    const prev = !!this.search$.value?.current ? JSON.parse(JSON.stringify(this.search$.value?.current)) : null;
    this.search$.next({
      previous: prev!,
      current: e,
    });
  }

  ngAfterViewInit(): void {
  }

  onRowClick(e: any) {
    if (!!e.id) this.onChange(e.id)
  }

  onSelectedIdsChange(e: string[] | number[]) {
    this.selectedIds = e;
  }

  onColumnCaptionClick(e: ICoreTableColumnItem) {
    const newSort: ISortItem[] = JSON.parse(JSON.stringify(this.sort$.value));
    newSort.map(c => {
      if (c.field === e.field) {
        if (c.sortDirection === EnumSortDirection.NONE) {
          c.sortDirection = EnumSortDirection.ASC;
        } else if (c.sortDirection === EnumSortDirection.ASC) {
          c.sortDirection = EnumSortDirection.DESC;
        } else {
          c.sortDirection = EnumSortDirection.NONE;
        }
      } else {
        c.sortDirection = EnumSortDirection.NONE
      }
    })
    this.sort$.next(newSort);
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe());

    /* Remove current corePageListInstance */
    const tryFind = this.corePageListService.instances.filter(x => x.instanceNumber === this.corePageListInstanceNumber);
    if (!!tryFind.length) {
      const excluded = this.corePageListService.instances.filter(x => x.instanceNumber !== this.corePageListInstanceNumber);
      this.corePageListService.instances = excluded;
    }
  }

}
