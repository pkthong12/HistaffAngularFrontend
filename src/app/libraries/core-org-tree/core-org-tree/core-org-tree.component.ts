import { Component, OnInit, AfterViewInit, OnDestroy, Input, ElementRef, ViewChild, EventEmitter, Output, AfterContentInit, OnChanges, SimpleChanges, isDevMode } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, debounceTime, distinctUntilChanged, filter, switchMap, } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { RecursiveService } from '../../services/recursive.service';
import { LayoutService } from 'src/app/services/layout.service';
// import { CoreOrgTreeState } from '../core-org-tree-state';
import { CoreOrgTreeService } from '../core-org-tree.service';
import { AlertService } from '../../alert/alert.service';
import { ICoreOrgTreeInstance, OrganizationService } from 'src/app/services/organization.service';

import { IOrgTreeItem, IOrgTreeLinerItem } from './IOrgTreeItem';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CoreFormControlBaseComponent } from '../../core-form-control-base/core-form-control-base.component';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';

import { liner_to_nested_array_script } from 'src/assets/js/rescusive_wk';
import { alertOptions } from 'src/app/constants/alertOptions';

export enum EnumCoreOrgTreeaAccessorMode {
  ACTIVATED_SINGLE = 'ACTIVATED_SINGLE',
  ACTIVATED_INHERITANCE = 'ACTIVATED_INHERITANCE',
  CHECKED = 'CHECKED',
}

@Component({
  selector: 'core-org-tree',
  templateUrl: './core-org-tree.component.html',
  styleUrls: ['./core-org-tree.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CoreOrgTreeComponent,
    },
    // CoreOrgTreeState,
  ],
})
export class CoreOrgTreeComponent extends CoreFormControlBaseComponent implements OnChanges, OnInit, AfterContentInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input() lineColor: string = 'transparent';
  @Input() fullWidthMode!: boolean;
  @Input() accessorMode!: EnumCoreOrgTreeaAccessorMode;
  @Input() fullRendering!: boolean;
  @Input() height!: number; // Chiều cao của CoreOrgTree cần được truyền vào!
  @Input() disabledLoopExpand!: boolean;
  @Input() showCheckInheritance!: boolean;

  @Output() itemDoubleClick = new EventEmitter();
  @Output() itemClick = new EventEmitter();
  @Output() showDissolvedEvent = new EventEmitter();//check dissolve for children comp

  @ViewChild('container') container!: ElementRef;
  @ViewChild('displayContent') displayContent!: ElementRef;
  @ViewChild('reducedIconWrapper') reducedIconWrapper!: ElementRef;

  override value!: number[];

  override writeValue(obj: number[]): void {
    this.value = obj;

    switch (this.accessorMode) {
      case EnumCoreOrgTreeaAccessorMode.CHECKED:
        if (!!obj) {
          const checkedKeys: string[] = [];
          this.checkedIds = obj; // <=== 24/10/2023
          obj.map(x => checkedKeys.push(x.toString()));
          this.loading = true;
          this.recursiveService.writeValueChecked(checkedKeys, this.data, this.disabledLoopExpand).subscribe(_ => {
            this.loading = false;
            if (!!this.data && !!this.data?.length) this.data[0].tree$Expanded = true;
          });
        }
        break;
      case EnumCoreOrgTreeaAccessorMode.ACTIVATED_SINGLE:
      case EnumCoreOrgTreeaAccessorMode.ACTIVATED_INHERITANCE:
        if (!!obj) {
          const activatedKeys: string[] = [];
          obj.map(x => activatedKeys.push(x.toString()));
          this.loading = true;
          this.recursiveService.writeValueActivated(activatedKeys, this.data, this.disabledLoopExpand).subscribe(_ => {
            this.loading = false;
            if (!!this.data && !!this.data?.length) this.data[0].tree$Expanded = true;
          });
        }
        break;
      default:
        break;
    }


    if (this.accessorMode === EnumCoreOrgTreeaAccessorMode.CHECKED) {

    } else /* EnumCoreOrgTreeaAccessorMode.ACTIVATED_SINGLE or EnumCoreOrgTreeaAccessorMode.ACTIVATED_INHERITANCE */ {

    }
  }

  override setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  activeIds: number[] = [];

  checkedIds: number[] = [];

  // for debugging
  // activeIdsString!: string;  
  data!: IOrgTreeItem[];
  loading!: boolean;
  subscriptions: Subscription[] = [];
  linnerOrgArray!: IOrgTreeLinerItem[];
  search!: string;
  search$ = new Subject<string>();
  reduced!: boolean;
  searchPlaceholder = EnumTranslateKey.UI_COMMON_PLACE_HOLDER_SEARCH_ORG;

  initializing!: boolean;
  checkInheritance: boolean = true; // default value is true
  showDissolved: boolean = false; // default value is false
  selectedKey!: string | undefined;
  selectedItem!: IOrgTreeLinerItem;
  lang!: string;
  //reduced$!: BehaviorSubject<boolean>;

  instanceNumber!: number;
  scrollContainerHeight!: number;

  constructor(
    //public override injector: Injector,
    private authService: AuthService,
    private recursiveService: RecursiveService,
    private mls: MultiLanguageService,
    public layoutService: LayoutService,
    private coreOrgTreeService: CoreOrgTreeService,
    // private coreOrgTreeState: CoreOrgTreeState,
    private alertService: AlertService,
    public organizationService: OrganizationService,
  ) {
    super(/*injector*/);
    this.initializing = true;

    // this.reduced$ = this.coreOrgTreeState.coreOrgTreeReduced$;

    this.initializing = false;

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['height']) {
      this.resizeHeight();
    }
  }

  ngOnInit(): void {

    this.instanceNumber = new Date().getTime();
    const newInstance: ICoreOrgTreeInstance = {
      instanceNumber: this.instanceNumber,
      selectedKey$: new BehaviorSubject<string | undefined>(undefined),
      activeKeys$: new BehaviorSubject<string[]>([]),
      checkedKeys$: new BehaviorSubject<string[]>([]),
      expandedKeys$: new BehaviorSubject<string[]>([]),
      checkInheritance$: new BehaviorSubject<boolean>(true)
    }
    this.organizationService.instances.push(newInstance)

    // Check xem chiều cao height có được truyền vào hay không
    if (this.height === undefined) {
      if (isDevMode()) {
        this.alertService.warn("CoreOrgTree không nhận được chiều cao (height) truyền vào từ lớp ngoài. Chiều cao mặc định sẽ được tính toán dựa vào bố cục chính.", alertOptions);
      }
      this.subscriptions.push(
        this.layoutService.contentContainerHeight$.subscribe(x => {
          // basicSpacing là paddingBottom của lớp content-container
          this.height = x - this.layoutService.corePageHeaderHeight - this.layoutService.basicSpacing;
        })
      )
    }

    this.subscriptions.push(
      this.organizationService.linerData$.subscribe((x) => {
        this.linnerOrgArray = x;
      })
    );

    this.subscriptions.push(
      this.organizationService.status$.subscribe((x) => {

        console.log("this.organizationService.status$ changes", x)

        const newActiveIds: number[] = [];
        x.activeKeys.map((k) => {
          newActiveIds.push(Number(k));
        });
        this.activeIds = newActiveIds;
        if (this.accessorMode !== EnumCoreOrgTreeaAccessorMode.CHECKED) {
          this.value = this.activeIds;
          this.onChange(this.activeIds);
        }
        this.selectedKey = x.selectedKey;
      })
    );

    this.subscriptions.push(
      this.search$
        .pipe(
          filter((x) => x !== null),
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((text) => {
            console.log('switchMap works');
            this.loading = true;
            return this.recursiveService.findItem(text, this.data);
          })
        )
        .subscribe((x) => {
          this.loading = false;
        })
    );
    this.subscriptions.push(
      this.organizationService.status$
        .pipe(filter((value) => !!!this.initializing && !!value))
        .subscribe((x) => {
          if (!!localStorage) {
            localStorage.setItem('coreOrgTreeStatus', JSON.stringify(x));
          }
        })
    );
    this.subscriptions.push(this.mls.lang$.subscribe((x) => (this.lang = x)));

  }

  private resizeHeight(): void {

    // height is not given and the tree resize as standard
    if (!!!this.height) {
      const sizeHeaderHeight = Number(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--size-header-height')
          .replace('px', '')
      );
      const sizeCorePageHeaderHeight = Number(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--size-core-page-header-height')
          .replace('px', '')
      );

      const containerHeight = window.innerHeight - sizeHeaderHeight - sizeCorePageHeaderHeight;

      const pageHeaderHeight = Number(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--size-core-page-header-height')
          .replace('px', '')
      );

      const paginationHeight = Number(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--size-core-pagination-height')
          .replace('px', '')
      );
      const sizeMarginCorePaginationFull = Number(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--size-margin-core-pagination')
          .replace('px', '')
      );


      const height = containerHeight - pageHeaderHeight - paginationHeight + sizeMarginCorePaginationFull;
      console.log(height);

      this.container?.nativeElement.style.setProperty(
        '--height', height + 'px'
      );

    } else {
      this.container?.nativeElement.style.setProperty(
        '--height', this.height + 'px'
      );
    }

  }

  ngAfterViewInit(): void {

    setTimeout(() => {

      this.subscriptions.push(
        this.organizationService.orgTreeData$.subscribe((x) => {
          this.data = x;
          console.log("new Data coming", this.data, new Date().getTime())
          if (!!this.data) {
            if (!!this.data.length) this.data[0].tree$Expanded = true;
          }
        })
      );
    })
  }

  onItemClickLocal(e: IOrgTreeItem): void {
    this.linnerOrgArray.map((x) => (x.active = false));
    setTimeout(() => this.buildTreeData());
  }

  onToggleItem(e: IOrgTreeItem) {
    const cloneCopy: IOrgTreeLinerItem[] = JSON.parse(
      JSON.stringify(this.linnerOrgArray)
    );
    const filter = cloneCopy.filter((x) => x.id === e.id);

    if (filter.length === 1) {
      filter[0].expand = !!!e.expand;
    }
    this.linnerOrgArray = cloneCopy;
    setTimeout(() => this.buildTreeData());
  }

  buildTreeData(): void {
    this.loading = true;

    const cloneCopy = JSON.parse(JSON.stringify(this.linnerOrgArray));

    if (typeof Worker !== 'undefined') {
      // Create a new

      console.log("🟢🟢 Worker works");

      const worker = new Worker(liner_to_nested_array_script);
      worker.addEventListener('message', ({ data }) => {
        this.data = data.list;
        if (!!this.data && !!this.data?.length) this.data[0].tree$Expanded = true;
        this.loading = false;
      });

      worker.postMessage({
        list: cloneCopy,
        keyField: 'id',
        titleField: 'name',
        parentField: 'parentId',
        activeField: 'active',
        //inheritantActiveField: 'inheritantActive',
        checkedField: 'checked',
        expandedField: 'expand',
      });
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
      const status = this.organizationService.status$.value;
      this.subscriptions.push(
        this.recursiveService
          .linerArrayToNestedArray(
            cloneCopy,
            'id',
            'name',
            'parentId',
            'active',
            'checked',
            'expand',
            //status
          )
          .subscribe((obj) => {
            this.data = obj.list;
            if (!!this.data && !!this.data?.length) this.data[0].tree$Expanded = true;
            this.loading = false;
          })
      );
    }
  }

  onExpandTogglerClick(e: IOrgTreeItem, event: any): void {

    event.stopPropagation();

    const newValue = !e.tree$Expanded;
    e.tree$Expanded = newValue;

    // updating status with newValue
    const currentExpandedIds =
      this.organizationService.status$.value?.expandedKeys;
    let newExpandedIds = currentExpandedIds?.filter(
      (_) => !!!currentExpandedIds.includes(e.id.toString())
    );

    if (newValue) {
      newExpandedIds?.push(e.id.toString());
    }

    newExpandedIds?.sort();

    const newExpandedKeys: string[] = [];
    newExpandedIds.map((x) => newExpandedKeys.push(x.toString()));

    this.organizationService.status$.next({
      ...this.organizationService.status$.value!,
      expandedKeys: newExpandedKeys,
    });
  }

  onItemCheck(e: IOrgTreeItem, newValue: boolean): void {
    this.itemClick?.emit(e);
    if (this.accessorMode !== EnumCoreOrgTreeaAccessorMode.CHECKED) return;

    // We have this var to hold nodes that are being changed
    let toggledIds: number[];
    // We should calculate a new state into this var: 
    const newCheckedIds: number[] = JSON.parse(JSON.stringify(this.checkedIds));

    // We will call this function after toggledIds changed
    const changeValue = () => {

      // If newValue === true, we will disctintly push changed ids to the state
      // Otherwise we will remove them from the state
      if (!!newValue) {
        toggledIds.map(x => {
          if (!!!newCheckedIds.includes(x)) {
            newCheckedIds.push(x);
          }
        })
        // Then asign the state to the newCheckedIds
        this.checkedIds = newCheckedIds;

      } else {
        const filter = newCheckedIds.filter(x => !!!toggledIds.includes(x))
        // Then asign the state to the filter
        this.checkedIds = filter;
      }

      // After the cases of if/else, make the control change with onChange
      this.value = this.checkedIds;
      this.onChange(this.checkedIds);
      this.markAsTouched();
    }

    /* start: THIS CODE SCOPE calculates toggledIds */
    if (this.checkInheritance) {
      // If true, all the nested items will be checked/unchecked
      this.recursiveService
        .nestedToggleCheck(e, newValue)
        .then((x) => {

          // The ids have been changed
          toggledIds = x;

          // Now toggledIds were set. We call the function we declared
          changeValue();

        })
        .catch((x: any) => {
          console.error(x);
        });
    } else {
      // Otherwise we simply toggle check for current item only
      toggledIds = [e.id];

      // Now toggledIds were set. We call the function we declared
      changeValue();

    }
    /* end: THIS CODE SCOPE calculates toggledIds */

    // That is. Happy debugging!

  }

  onCheckIncludeDissolvedChange(value: boolean) {
    console.log("onCheckIncludeDissolvedChange", value);
    this.showDissolvedEvent.emit(value);
  }

  onCheckInheritanceChange(value: boolean) {
    this.organizationService.status$.next({
      ...this.organizationService.status$.value!,
      checkInheritance: value,
    });
  }

  onObjectClick(e: IOrgTreeItem, event: any): void {

    // remove highlight class
    // TO DO

    if (!!e.protected) return;

    this.itemClick?.emit(e);

    if (this.accessorMode === EnumCoreOrgTreeaAccessorMode.CHECKED) return;
    let activeIds: number[] = [];
    this.data.map((item) => (item.active = false));
    if (
      this.accessorMode ===
      EnumCoreOrgTreeaAccessorMode.ACTIVATED_INHERITANCE ||
      !!!this.accessorMode
    ) {
      // If true, all the nested items will be active, the others are inactive
      this.recursiveService
        .nestedResetActive(e, true)
        .then((x) => {
          activeIds = x;
          activeIds.sort();
          const newActiveKeys: string[] = [];
          activeIds.map((x) => newActiveKeys.push(x.toString()));
          this.organizationService.status$.next({
            ...this.organizationService.status$.value!,
            activeKeys: newActiveKeys,
            selectedKey: e.id.toString()
          });
          this.activeIds = activeIds;
          console.log(this.activeIds);
          this.onChange(activeIds);
        })
        .catch((x: any) => {
          console.error(x);
        });


    } else {

      // ACTIVATED_SINGLE
      // Otherwise we simply set current item to be active only
      activeIds = [e.id];
      this.activeIds = activeIds;

      this.organizationService.status$.next({
        ...this.organizationService.status$.value!,
        activeKeys: [e.id.toString()],
        selectedKey: e.id.toString(),
      });

      this.onChange(activeIds);
    }

    const { detail } = event;

    if (detail === 2) {
      console.log('This was a dblclick');
      this.itemDoubleClick.emit(e);
    }

    this.selectedItem = e;

  }

  onSearchChange(text: string): void {
    this.search$.next(text);
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit")
  }

  ngOnDestroy(): void {
    this.subscriptions.map((x) => x?.unsubscribe());

    if (!!this.instanceNumber) {
      const tryToFind = this.organizationService.instances.filter(
        (x) => x.instanceNumber === this.instanceNumber
      );

      if (!!tryToFind.length) {
        const newInstances = this.organizationService.instances.filter(
          (x) => x.instanceNumber !== this.instanceNumber
        );
        this.organizationService.instances = newInstances;
      }
    }
  }
}
