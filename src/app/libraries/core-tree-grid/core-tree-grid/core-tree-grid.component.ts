import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { api } from 'src/app/constants/api/apiDefinitions';
import { CoreFormControlBaseComponent } from '../../core-form-control-base/core-form-control-base.component';

import { AppService } from 'src/app/services/app.service';
import { IEveryTreeStatus, RecursiveService } from '../../services/recursive.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { DialogService } from 'src/app/services/dialog.service';
import { CoreControlService } from '../../core-form/core-control.service';

import { BehaviorSubject, Subscription, filter } from 'rxjs';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';

import { liner_to_nested_array_script } from 'src/assets/js/rescusive_wk';
import { EnumCoreButtonVNSCode } from '../../core-button-group-vns/core-button-group-vns/EnumCoreButtonVNSCode';
import { ICoreButtonVNS } from '../../core-button-group-vns/core-button-group-vns/ICoreButtonVNS';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { ICorePageEditCRUD } from '../../core-page-edit/core-page-edit.component';
import { ICoreTreeGridColumnItem } from '../core-tree-grid-interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'core-tree-grid',
  templateUrl: './core-tree-grid.component.html',
  styleUrls: ['./core-tree-grid.component.scss']
})
export class CoreTreeGridComponent extends CoreFormControlBaseComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() keyField!: string;
  @Input() titleField!: string;
  @Input() parentField!: string;
  @Input() getFullListApi!: api;
  @Input() treeColumnWidth!: number;
  @Input() columns!: ICoreTreeGridColumnItem[];
  @Input() crud!: ICorePageEditCRUD;

  @Output() onRowDoubleClick = new EventEmitter()
  @Output() onSubmitSuccess = new EventEmitter()

  @ViewChild('container') container!: ElementRef;

  lang!: string;

  dialogInstanceNumber!: number;

  loading!: boolean;
  linearItems!: any[];
  data!: any[];
  maxTier!: number;
  subscriptions: Subscription[] = [];
  pendingParentContext: any;
  pendingContext: any;
  pendingAction!: EnumCoreButtonVNSCode;

  editModeActivated!: boolean;
  checkError$ = new BehaviorSubject<boolean>(false);

  form!: FormGroup;

  status: IEveryTreeStatus = {
    selectedKey: undefined,
    activeKeys: [],
    expandedKeys: [],
  };

  toolItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.HEADER_CREATE,
    EnumCoreButtonVNSCode.HEADER_EDIT,
    EnumCoreButtonVNSCode.HEADER_DELETE
  ]

  headerToolItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.HEADER_CREATE,
  ]

  constructor(
    private appService: AppService,
    private recursiveService: RecursiveService,
    private mls: MultiLanguageService,
    private dialogService: DialogService,
    private coreControlService: CoreControlService
  ) {
    super()
  }

  ngOnInit(): void {

    this.form = this.coreControlService.toCoreTreeGridInRowFormGroup(this.columns)
  }

  private reload(): void {
    this.subscriptions.push(
      this.appService.get(this.getFullListApi).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200) {
            this.linearItems = body.innerBody;
            this.buildTreeData();
          }
        }
      })
    )
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.container.nativeElement.style.setProperty('--tree-container-width', this.treeColumnWidth + 'px')
      let gridTotalWidth = 0;
      this.columns.filter(x => !!!x.hidden).map(m => gridTotalWidth += m.width!);
      this.container.nativeElement.style.setProperty('--grid-total-width', gridTotalWidth + 'px');

      this.subscriptions.push(
        this.mls.lang$.subscribe(x => this.lang = x)
      )

      this.reload()

      this.subscriptions.push( // outer-push
        this.dialogService.dialogConfirmed$.pipe(
          filter(i => !!!this.dialogService.busy && !!i?.confirmed && i.instanceNumber === this.dialogInstanceNumber)
        ).subscribe(() => {
          this.dialogService.resetService();
          if (this.pendingAction === EnumCoreButtonVNSCode.HEADER_DELETE) {
            this.loading = true;
            this.subscriptions.push( // middem-push
              this.appService.post(this.crud.d!, { id: this.pendingContext.id }).subscribe(x => {
                if (x.ok && x.status === 200) {
                  const body: IFormatedResponse = x.body;
                  if (body.statusCode === 200) {
                    this.subscriptions.push( // inner-push
                      this.appService.get(this.getFullListApi).subscribe(x => {
                        if (x.ok && x.status === 200) {
                          const body: IFormatedResponse = x.body;
                          if (body.statusCode === 200) {
                            this.linearItems = body.innerBody;
                            this.onSubmitSuccess.emit(true);
                            this.buildTreeData();
                          }
                        }
                      })
                    )
                  }
                }
                this.loading = false;
              })
            )
          }
        })
      )

    });
  }

  buildTreeData(): void {

    this.loading = true;

    const cloneCopy = JSON.parse(JSON.stringify(this.linearItems))

    if (typeof Worker !== 'undefined') {
      // Create a new

      const worker = new Worker(liner_to_nested_array_script)
      worker.addEventListener("message", ({ data }) => {

        this.data = data.list;
        this.maxTier = data.maxTier

        setTimeout(() => this.container.nativeElement.style.setProperty('--max-tier', this.maxTier))

        this.loading = false;
      })

      worker.postMessage({
        list: cloneCopy,
        keyField: this.keyField,
        titleField: this.titleField,
        parentField: this.parentField,
        status: this.status
      });

    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
      this.subscriptions.push(
        this.recursiveService.linerArrayToNestedArray(cloneCopy, this.keyField, this.titleField, this.parentField, undefined, undefined, undefined, this.status)
          .subscribe(obj => {
            this.data = obj.list;
            this.maxTier = obj.maxTier

            setTimeout(() => this.container.nativeElement.style.setProperty('--max-tier', this.maxTier))

            this.loading = false;
          })
      )
    }
  }

  onExpandTogglerClick(context: any): void {
    context.tree$Expanded = !!!context.tree$Expanded

    // update status
    if (!!context.tree$Expanded) {
      const filter = this.status.expandedKeys.filter(x => x === context.tree$Key.toString());
      if (filter.length === 0) {
        this.status.expandedKeys.push(context.tree$Key.toString())
      }
    } else {
      const filter = this.status.expandedKeys.filter(x => x !== context.tree$Key.toString());
      this.status.expandedKeys = filter;
    }

  }

  onObjectClick(context: any, event: any): void {
  }

  onRowClick(context: any, event: any): void {
    event.stopImmediatePropagation();
    if (event?.detail === 2) {
      this.onRowDoubleClick.emit(context);
    }
  }

  onHeaderToolClick(event: ICoreButtonVNS): void {
    // prepare a blank row
    const blankRow: any = {};
    this.columns.map(x => {
      blankRow[x.field] = null;
    })

    this.columns.filter(x => !!x.control).map(x => {
      blankRow[x.control?.field!] = null;
    })
    blankRow['id'] = 0;
    blankRow['tree$Key'] = 0;
    blankRow[this.titleField] = '';
    blankRow['tree$Title'] = '';
    blankRow[this.keyField] = 0;
    blankRow[this.parentField] = null;
    blankRow['tree$Parent'] = null;
    blankRow['tree$Tier'] = 1;
    blankRow['tree$Children'] = [];

    // push the blankRow to the current data
    this.data.unshift(blankRow);

    this.pendingContext = blankRow;

    // activate editMode (create)
    this.editModeActivated = true;

    this.toolItems = [
      EnumCoreButtonVNSCode.HEADER_SAVE,
      EnumCoreButtonVNSCode.HEADER_CANCEL
    ]
  }

  onToolClick(event: ICoreButtonVNS, context: any): void {
    switch (event.code) {
      case EnumCoreButtonVNSCode.HEADER_SAVE:

        this.form.updateValueAndValidity();
        this.checkError$.next(true);
        if (!!!this.form.valid) return;

        let api: api;

        if (!!Number(this.form.get('id')?.value)) {
          api = this.crud.u!
        } else {
          api = this.crud.c!
        }

        this.loading = true;
        this.subscriptions.push( // middem-push
          this.appService.post(api, this.form.getRawValue()).subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.statusCode === 200) {
                this.subscriptions.push( // inner-push
                  this.appService.get(this.getFullListApi).subscribe(x => {
                    if (x.ok && x.status === 200) {
                      const body: IFormatedResponse = x.body;
                      if (body.statusCode === 200) {
                        this.linearItems = body.innerBody;
                        this.buildTreeData();
                        this.editModeActivated = false;
                        this.toolItems = [
                          EnumCoreButtonVNSCode.HEADER_CREATE,
                          EnumCoreButtonVNSCode.HEADER_EDIT,
                          EnumCoreButtonVNSCode.HEADER_DELETE
                        ]
                      }
                    }
                  })
                )
              }
            }
            this.loading = false;
            this.form.reset();
          })
        )

        break;
      case EnumCoreButtonVNSCode.HEADER_CANCEL:
        this.editModeActivated = false;
        this.form.reset();
        this.toolItems = [
          EnumCoreButtonVNSCode.HEADER_CREATE,
          EnumCoreButtonVNSCode.HEADER_EDIT,
          EnumCoreButtonVNSCode.HEADER_DELETE
        ];

        if (this.pendingContext.id === 0) {
          if (this.pendingContext.tree$Parent === null) {
            const newData = this.data.filter(x => x.id !== 0);
            this.data = newData;
          } else {
            const filter = this.pendingParentContext.tree$Children.filter((child: any) => child.id !== this.pendingContext.id);
            this.pendingParentContext.tree$Children = filter;
          }
        }

        break;
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        // prepare a blank row
        const blankRow: any = {};
        this.columns.map(x => {
          blankRow[x.field] = null;
        })

        this.columns.filter(x => !!x.control).map(x => {
          blankRow[x.control?.field!] = null;
        })
        blankRow['id'] = 0;
        blankRow['tree$Key'] = 0;
        blankRow[this.titleField] = '';
        blankRow['tree$Title'] = '';
        blankRow[this.keyField] = 0;
        blankRow[this.parentField] = context.id;
        blankRow['tree$Parent'] = context.id;
        blankRow['tree$Tier'] = context.tree$Tier + 1;
        blankRow['tree$Children'] = [];

        // push the blankRow to the current data at the begining
        context.tree$Children.unshift(blankRow);

        // make sure to expand
        context.tree$Expanded = true;

        // save expand mode to state
        const filter = this.status.expandedKeys.filter(x => x === context.tree$Key.toString());
        if (filter.length === 0) {
          this.status.expandedKeys.push(context.tree$Key.toString())
        }

        // save parent context
        this.pendingParentContext = context

        this.pendingContext = blankRow;

        const newFormData: any = {}
        newFormData[this.parentField] = blankRow[this.parentField]
        this.form.patchValue(newFormData)

        // activate editMode (create)
        this.editModeActivated = true;

        this.toolItems = [
          EnumCoreButtonVNSCode.HEADER_SAVE,
          EnumCoreButtonVNSCode.HEADER_CANCEL
        ]


        break;
      case EnumCoreButtonVNSCode.HEADER_EDIT:
        this.editModeActivated = true;
        this.pendingContext = context;

        this.loading = true;
        this.subscriptions.push( // middem-push
          this.appService.get(this.crud.r! + "?id=" + context.id).subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.statusCode === 200) {
                this.form.patchValue(body.innerBody)
              }
            }
            this.loading = false;
          })
        )

        this.toolItems = [
          EnumCoreButtonVNSCode.HEADER_SAVE,
          EnumCoreButtonVNSCode.HEADER_CANCEL
        ]

        break;
      case EnumCoreButtonVNSCode.HEADER_DELETE:
        if (context.tree$HasChildren) {
          this.dialogService.title$.next(EnumTranslateKey.UI_CORE_DIALOG_SERVICE_INFO)
          this.dialogService.body$.next(EnumTranslateKey.UI_CORE_TREE_GRID_CANNOT_DELETE_NODE_HANVING_CHILDREN)
          this.dialogService.showCancelOnly$.next(true);
          this.dialogService.okButtonText$.next(EnumTranslateKey.YES)
          this.dialogService.cancelButtonText$.next(EnumTranslateKey.CANCEL)
          this.dialogService.busy = true;
          this.dialogService.showConfirmDialog$.next(true);
        } else {
          this.dialogService.title$.next(EnumTranslateKey.UI_CORE_DIALOG_SERVICE_CONFIRMATION)
          this.dialogService.body$.next(EnumTranslateKey.UI_CORE_DIALOG_SERVICE_ARE_YOU_SURE_TO_DELETE)
          this.dialogService.informationLines$.next([context.tree$Title])
          this.dialogService.showCancelOnly$.next(false);
          this.pendingContext = context;
          this.pendingAction = EnumCoreButtonVNSCode.HEADER_DELETE;
          this.dialogService.okButtonText$.next(EnumTranslateKey.YES)
          this.dialogService.cancelButtonText$.next(EnumTranslateKey.CANCEL)
          this.dialogService.busy = true;
          this.dialogService.showConfirmDialog$.next(true);
        }
        break;

    }
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }

}
