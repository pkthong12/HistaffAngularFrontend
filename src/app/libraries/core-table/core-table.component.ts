import { Component, ElementRef, Input, OnInit, OnDestroy, AfterViewInit, OnChanges, ViewChild, SimpleChanges, Output, EventEmitter, TemplateRef, isDevMode } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { LayoutService } from 'src/app/services/layout.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { AlertService } from '../alert/alert.service';
import { AuthService } from 'src/app/services/auth.service';

import { EnumCoreTablePipeType } from './EnumCoreTablePipeType';

export interface ICoreTableColumnItem {
  caption: EnumTranslateKey | string; // Latter we will remove "| string"
  field: string;
  type: string;
  search?: string;
  pipe?: EnumCoreTablePipeType;
  align: string;
  readonly?: boolean;
  width?: number;
  hidden?: boolean;
  hideSearchBox?: boolean;
  sortDirection?: EnumSortDirection;
  templateRef?: TemplateRef<any>;
  templateRefAllowEditOnRowActived?: boolean;
  translate?: boolean;
}

export enum ECoreTableToolCode {
  edit = 'edit',
  delete = 'delete',
  complete = 'complete',
  navigate = 'navigate',
}

export enum ECoreTableToolClass {
  edit = 'edit-icon',
  delete = 'delete-icon',
  repeat = 'repeat-icon',
  navigate = 'navigate-icon'
}

export interface ICoreTableToolItem {
  code: ECoreTableToolCode;
  class: ECoreTableToolClass;
  caption?: EnumTranslateKey | string; // Later we will remove "| string"

  /* callbacks to calculate disabled and hiden based on row*/
  disabledFn?: (row: any) => boolean;
  hiddenFn?: (row: any) => boolean;
}

export interface ICoreTableToolClickEventEmitterData {
  code: ECoreTableToolCode;
  id: string | number;
}

/*
export interface ICoreTableRowDoubleClickEventEmitterData {
  id: string | number;
}
*/

interface IDoubleTouchendData {
  previous: number;
  current: number;
}

import { Subscription, BehaviorSubject, filter, debounceTime, Observable, fromEvent } from 'rxjs';
import { EnumSortDirection, ISearchItem } from 'src/app/interfaces/IQueryListRequest';
import { CorePageListService } from '../core-page-list/core-page-list.service';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { CoreFormControlBaseComponent } from '../core-form-control-base/core-form-control-base.component';
import { noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';
import { ICoreButtonVNS } from '../core-button-group-vns/core-button-group-vns/ICoreButtonVNS';
import { EnumCoreButtonVNSCode } from '../core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode';

@Component({
  selector: 'core-table',
  templateUrl: './core-table.component.html',
  styleUrls: ['./core-table.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CoreTableComponent
    }
  ]
})
export class CoreTableComponent extends CoreFormControlBaseComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  /*
  This component displays input data without pagination.
  For paginating please organize from parents
  */

  @Input() id!: string; // for html id identifying
  @Input() width!: string;
  @Input() height!: number;
  @Input() showCheckbox!: boolean;
  @Input() checkboxSize!: number;
  @Input() outerButtons!: ICoreButtonVNS[];
  @Input() showTools!: boolean;
  @Input() tools!: ICoreTableToolItem[];
  @Input() checkingResetFlag!: boolean;

  /* change these 2 props to wrap header texts */
  @Input() headerWrap!: boolean;
  @Input() headerFirstRowHeight!: number;
  /** */
  
  @Input() headerSecondRowHeight!: number;
  @Input() wrap!: boolean;
  @Input() allowCellScrollY!: boolean;
  @Input() loading!: boolean;
  @Input() rowHeight!: string; // VERY IMPORTANT PROPERTY
  @Input() frozen!: number;
  @Input() footer!: any;
  @Input() columns!: ICoreTableColumnItem[]; // required
  @Input() data!: any[]; // required
  @Input() selectedIds!: string[] | number[];
  @Input() corePageListInstanceNumber!: number;
  @Input() disableHighlightOnClick!: boolean;
  @Input() freeMode!: boolean;
  @Input() searchSwitchDisabled: boolean = false;
  @Input() inlineToolItems!: EnumCoreButtonVNSCode[];
  @Input() columnSearchDefaultOpen!: boolean;
  @Input() lazyLoading!: boolean;

  @Input() noPaddingCell!: boolean;

  @Output() onSearching = new EventEmitter<ISearchItem[]>();
  @Output() onToolClick = new EventEmitter<ICoreTableToolClickEventEmitterData>();
  @Output() onRowClick = new EventEmitter();
  @Output() onRowDoubleClick = new EventEmitter();
  @Output() onSelectedIdsChange = new EventEmitter<string[] | number[]>();
  @Output() onSelectedDataChange = new EventEmitter<any[]>();
  @Output() onColumnCaptionClick = new EventEmitter<ICoreTableColumnItem>();

  checkboxColumnWidth: number = 30; // (--checkbox-size)* 2 Please do not change this

  searchActive!: boolean;
  visibleColumns!: ICoreTableColumnItem[];
  frozenLefts: number[] = [];
  checkingModel: boolean[] = [];
  headerCheckboxState!: boolean;
  checkingState!: number; // 0=none; 1=all; 2=mixed
  tbodyheight!: number;
  visibleRowCount!: number;

  rowTouchendStream$: BehaviorSubject<IDoubleTouchendData> = new BehaviorSubject<IDoubleTouchendData>({ previous: -2, current: -1 });
  subscriptions: Subscription[] = [];

  searchObject!: ISearchItem[];

  lang!: string;

  activeRow!: any; // number | string

  mouseDown = false;
  startX: any;
  endX: any;

  scrollStream$!: Observable<any>;

  /* FOR LAZY UI LOADING */
  renderAhread: number = 0;
  hiddenTopHeight: number = 0;
  hiddenBottomHeight: number = 0;
  scrollTop: number = 0;
  offsetY: number = 0;
  visibleData!: any[];
  startNode: number = 0;
  /***********************/

  @ViewChild('coreTable') coreTable!: ElementRef;
  @ViewChild('table') table!: ElementRef;
  @ViewChild('firstHeaderRow') firstHeaderRow!: ElementRef;

  constructor(
    private layoutService: LayoutService,
    private corePageListService: CorePageListService,
    private mls: MultiLanguageService,
    private alertService: AlertService,
    private authService: AuthService
  ) {
    super();
  }

  calculateScroll(): void {

    try {

      if (!!!this.coreTable) return;
      if (!!!this.lazyLoading) return;

      const height = Number(getComputedStyle(this.coreTable.nativeElement).getPropertyValue('--height').replace('px', ''));
      const rowHeight = Number(getComputedStyle(this.coreTable.nativeElement).getPropertyValue('--row-height').split('px')[0]);

      if (!!!rowHeight) throw new Error("Could not get --row-height property");

      let startNode = Math.floor(this.scrollTop / rowHeight) - this.renderAhread;
      startNode = Math.max(0, startNode);
      this.startNode = startNode || 0;
      let visibleNodeCount = Math.ceil(height / rowHeight) + 2 * this.renderAhread;
      visibleNodeCount = Math.min(this.data.length - startNode, visibleNodeCount);
      this.offsetY = startNode * rowHeight;
      const newVisibleData: any[] = [];

      this.hiddenTopHeight = startNode * rowHeight;
      this.hiddenBottomHeight = (this.data.length - startNode - visibleNodeCount) * rowHeight;
      for (let i = startNode; i < startNode + visibleNodeCount; i++) {
        newVisibleData.push(this.data[i])
      }

      this.visibleData = newVisibleData;

      /* OPEN COMMENTS TO SEE CONTROL VALUES */
      console.log("startNode", startNode)
      /*
      console.log("this.offsetY", this.offsetY)
      console.log("this.hiddenTopHeight", this.hiddenTopHeight)
      console.log("this.hiddenBottomHeight", this.hiddenBottomHeight)
      console.log("this.visibleData.length", this.visibleData.length)
      const controlValue = (this.hiddenTopHeight + this.hiddenBottomHeight + this.visibleData.length * rowHeight) / rowHeight
      console.log("controlValue", controlValue) // Must equeal pageSize
      */
    } catch (error: any) {
      if (isDevMode() && this.authService.data$.value?.id === '8c24683d-7d52-4f5a-8090-31c777e8869d') {
        this.alertService.error(error.message, noneAutoClosedAlertOptions);
      }

      this.visibleData = JSON.parse(JSON.stringify(this.data));

    }
  }

  startDragging(e: any, col: ICoreTableColumnItem, flag: any) {
    if (e.buttons === 1) {
      this.startX = e.pageX;
      if (!!!this.mouseDown) {

      }
      this.mouseDown = true;
    }
  }

  stopDragging(e: any, col: ICoreTableColumnItem, flag: any) {
    if (!!this.mouseDown) {
      this.endX = e.pageX;
      let offset = this.endX - this.startX;
      col.width! += offset;
      this.mouseDown = false;
      this.endX = 0;
      this.startX = 0;
    }
  }

  moveEvent(e: any, col: ICoreTableColumnItem) {
    e.preventDefault();
    if (!this.mouseDown) {
      return;
    }
    const x = e.pageX;
    console.log("moveEvent", e.pageX)
  }

  ngOnInit(): void {

    if (this.showCheckbox) {
      if (!this.checkboxSize) {
        this.checkboxSize = 15;
      }
    }

    if (this.headerFirstRowHeight === undefined) this.headerFirstRowHeight = 40;
    if (this.headerSecondRowHeight === undefined) this.headerSecondRowHeight = 40;


    /* Validate columns input to make sure one of fields is 'id' */
    if (!!!this.columns) {
      this.alertService.error(this.id + ": Columns are not defined.", noneAutoClosedAlertOptions)
    }

    if (this.columns.filter((c: ICoreTableColumnItem) => c.field === 'id').length === 0 && isDevMode() && this.columns.length) {
      this.alertService.error(this.id + ": The columns must have one with 'field' property === 'id'", noneAutoClosedAlertOptions)
    }

    this.visibleColumns = this.columns.filter((c: ICoreTableColumnItem) => !!!c.hidden)
    if (!!!this.visibleColumns.length && isDevMode() && this.columns.length) {
      this.alertService.error(this.id + ": No visible column defined.", noneAutoClosedAlertOptions)
    }

    // add default sort direction to visibleColumns
    this.visibleColumns.map(c => c.sortDirection = EnumSortDirection.NONE)

    /* START: Initializing searchObject */
    const newSearchObject: ISearchItem[] = [];
    this.visibleColumns.map(c => {
      newSearchObject.push({
        field: c.field,
        searchFor: ''
      })
    })
    this.searchObject = newSearchObject;
    /* END: Initializing searchObject */

    const frozenColumns = this.visibleColumns.filter((_, index) => index < this.frozen);

    let left = this.checkboxSize! * 2 || 0; // the first size is for checkbox
    frozenColumns.map(c => {
      if (!!!c.width) console.error(this.id + ": Each frozen column must have its number property 'width'.");
      this.frozenLefts.push(left);
      left = left + c.width!
    })

    this.subscriptions.push(
      this.rowTouchendStream$.pipe(
        filter((x: any) => x.current === x.previous),
        debounceTime(200),
      ).subscribe((y: any) => {
        this.onRowDoubleClick.emit({
          id: this.data[y.current].id
        })
      })
    )

    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['checkingResetFlag']) {
      if (!!this.data) {
        this.toggleCheckAll(false)
        this.headerCheckboxState = false;
      }
    }

    if (changes['data']) {
      const newCheckingModel: boolean[] = [];
      changes['data'].currentValue?.map((_: any) => {
        newCheckingModel.push(false)
      });
      this.checkingModel = newCheckingModel;

      if (!!this.lazyLoading) {
        if (!!this.coreTable) {
          this.calculateScroll();
        }
      } else {
        this.visibleData = changes['data'].currentValue;
      }
    }

    if (changes['checkedIds']) {
      const newCheckingModel: boolean[] = [];
      changes['checkedIds'].currentValue?.map((checkedId: any) => {
        this.data.map((item) => {
          if (item['id'] === checkedId) {
            newCheckingModel.push(true);
          } else {
            newCheckingModel.push(false);
          }
        })
      })
      this.checkingModel = newCheckingModel;
    }
    if (changes['loading']) {
      this.loading = changes['loading'].currentValue;
    }
    if (changes['columns']) {
      this.visibleColumns = this.columns.filter((c: ICoreTableColumnItem) => !!!c.hidden)
    }
    if (changes['columnSearchDefaultOpen']) {
      this.searchActive = !!changes['columnSearchDefaultOpen'].currentValue
    }
  }

  private resetHeaderFirstRowHeight(): void {
    setTimeout(() => {
      const firstHeaderRowHeight = this.firstHeaderRow.nativeElement.getBoundingClientRect().height;
      this.coreTable.nativeElement.style.setProperty('--header-1st-row-height',
      firstHeaderRowHeight + 'px'
      );
    })
  }

  ngAfterViewInit(): void {

    if (this.corePageListInstanceNumber) {
      const callerFilter = this.corePageListService.instances.filter(x => x.instanceNumber === this.corePageListInstanceNumber);
      if (!!callerFilter.length) {
        const caller = callerFilter[0];
        caller.coreTableRef = this.coreTable;
      }

      if (!!!this.freeMode) {
        this.subscriptions.push(
          this.corePageListService.instances.filter(x => x.instanceNumber === this.corePageListInstanceNumber)[0].id$.subscribe(x => {
            this.activeRow = x;
          })
        )
      }

      this.subscriptions.push(
        this.corePageListService.instances.filter(x => x.instanceNumber === this.corePageListInstanceNumber)[0].tbodyHeight$.subscribe(x => {
          if (!!x) {
            this.tbodyheight = x;
          }
        })
      )

      const rect = this.coreTable.nativeElement.getBoundingClientRect();
      this.coreTable.nativeElement.style.setProperty('--table-width', rect.width + 'px')

    }

    this.scrollStream$ = fromEvent(this.table.nativeElement, 'scroll');

    setTimeout(() => {

      if (!!this.width) this.coreTable.nativeElement.style.setProperty('--width', this.width + 'px');
      if (!!this.rowHeight) this.coreTable.nativeElement.style.setProperty('--row-height', this.rowHeight + 'px');
      if (!!this.height) this.coreTable.nativeElement.style.setProperty('--height', this.height + 'px');

      // Chỉ subscride sau khi các lệnh trên đã được thực hiện
      this.subscriptions.push(
        this.scrollStream$
          .pipe(
            debounceTime(50)
          )
          .subscribe(event => {
            this.scrollTop = event.srcElement.scrollTop;
            this.calculateScroll();
          })
      )

    }, 0)

    this.resetHeaderFirstRowHeight();

    this.subscriptions.push(
      this.mls.lang$.subscribe(_ => {
        this.resetHeaderFirstRowHeight();
      })
    )

  }

  onToolClickLocal(rowIndex: number, toolIndex: number): void {
    this.onToolClick.emit({
      code: this.tools[toolIndex].code,
      id: this.data[rowIndex].id
    })
  }

  toggleCheckAll(args: boolean) {
    const newCheckingModel: boolean[] = [];
    const newSelectedIds: any[] = [];
    const newSelectedData: any[] = [];

    this.data.map(item => {
      newCheckingModel.push(args);
      if (args) {
        newSelectedIds.push(item.id);
        newSelectedData.push(item);
      }
    });

    this.checkingModel = newCheckingModel;
    this.checkingState = args ? 1 : 0;
    this.onSelectedIdsChange.emit(newSelectedIds);
    this.onSelectedDataChange.emit(newSelectedData);
  }

  onCheckingNgModelChange() {
    const newSelectedIds: number[] = [];
    const newSelectedData: any[] = [];
    this.data.filter((_: any, index: number) => !!this.checkingModel[index]).map(item => {
      newSelectedIds.push(item.id)
      newSelectedData.push(item)
    })
    this.onSelectedIdsChange.emit(newSelectedIds);
    this.onSelectedDataChange.emit(newSelectedData);

    if (newSelectedIds.length === 0) {
      this.checkingState = 0; // none
    } else if (newSelectedIds.length === this.checkingModel.length) {
      this.checkingState = 1; // all
    } else {
      this.checkingState = 2; // mixed
    }

  }

  onDoubleClickLocal(rowIndex: number) {
    this.onRowDoubleClick.emit(this.data[rowIndex])
  }

  onClickLocal(row: any, event: any) {

    console.log("onClickLocal row", row, "event", event)

    if (event.detail === 1) {
      this.activeRow = row.id;
      this.onRowClick.emit(row);
    } else if (event.detail === 2) {
      this.onRowDoubleClick.emit(row)
    }

  }

  onRowTouchend(rowIndex: number) {
    this.rowTouchendStream$.next({
      previous: this.rowTouchendStream$.value.current,
      current: rowIndex
    });
  }

  onSearch(e: string, searchColumnIndex: number): void {
    this.searchObject.filter((_, i) => i === searchColumnIndex)[0].searchFor = e;
    this.onSearching.emit(this.searchObject);
  }

  onColumnCaptionClickLocal(column: ICoreTableColumnItem) {

    if (!!column.templateRef) return; // no action for templateRef type

    this.onColumnCaptionClick.emit(column);

    // update sort dicrection property of this column
    // and clear up the property for the other visibleColumns
    this.visibleColumns.map(vc => {
      if (vc.field === column.field) {
        vc.sortDirection = vc.sortDirection === EnumSortDirection.NONE ? EnumSortDirection.ASC : vc.sortDirection === EnumSortDirection.ASC ? EnumSortDirection.DESC : EnumSortDirection.NONE;
      } else {
        vc.sortDirection = EnumSortDirection.NONE
      }
    })
  }

  toggleAllowSearch(): void {
    this.searchActive = !!!this.searchActive
  }

  onInlineToolClick(e: ICoreButtonVNS, row: any): void {
    console.log("onInlineToolClick", e, row)
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe());
  }

}
