import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { CoreFormControlBaseComponent } from '../../core-form-control-base/core-form-control-base.component';
import { ICorePageListApiDefinition } from '../../core-page-list/core-page-list.component';
import { ICoreTableColumnItem } from '../../core-table/core-table.component';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IFilterOperator, IInOperator } from 'src/app/interfaces/IQueryListRequest';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { DomService } from '../../services/dom.service';
import { AppService } from 'src/app/services/app.service';
import { ResponseService } from 'src/app/services/response.service';
import { AlertService } from '../../alert/alert.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

import { api } from 'src/app/constants/api/apiDefinitions';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { alertOptions, noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';

@Component({
  selector: 'core-mcc',
  templateUrl: './core-mcc.component.html',
  styleUrls: ['./core-mcc.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CoreMccComponent
    }
  ]
})
export class CoreMccComponent extends CoreFormControlBaseComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() height!: number;
  @Input() columns!: ICoreTableColumnItem[];
  @Input() shownFrom!: string;
  @Input() apiDefinition!: ICorePageListApiDefinition;
  @Input() getByIdApi!: api;
  @Input() outerParam$!: BehaviorSubject<any>; // Some simple master data do not have outerParam$ IMPORTANT!!!
  @Input() selectedRow$!: BehaviorSubject<any>; // To hold full selected row state after double-click
  @Input() outerFilterOperators!: IFilterOperator[];
  @Input() outerInOperators!: IInOperator[];
  @ViewChild('container') container!: ElementRef;

  subscriptions: Subscription[] = [];
  expandState!: boolean;
  shownText!: string;
  loading!: boolean;
  lang!: string;
  listenerFn!: () => void;

  constructor(
    private domService: DomService,
    private renderer: Renderer2,
    private appService: AppService,
    private responseService: ResponseService,
    private alertService: AlertService,
    private mls: MultiLanguageService
  ) {
    super()
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
  }

  toggleExpanded(): void {
    if (!this.disabled) {
      this.expandState = !!!this.expandState;
    }
  }

  onRowDoubleClick(event: any) {
    this.selectedRow$?.next(event);
    if (this.value !== event['id']) this.markAsTouched();
    this.value = event['id'];
    this.onChange(event['id']);
    this.shownText = event[this.shownFrom];
    this.toggleExpanded();
  }

  override writeValue(obj: any): void {
    this.value = obj;
    if (!!!obj) {
      this.shownText = "";
    } else {
      this.loading = true;
      this.subscriptions.push(
        this.appService.get(this.getByIdApi + "?id=" + obj.toString()).subscribe(x => {
          this.loading = false;
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            //this.responseService.resolve(body);
            if (body.statusCode === 200) {
  
              this.shownText = body.innerBody[this.shownFrom];
  
            } else {
              this.alertService.error(this.mls.trans(body.messageCode, this.lang), alertOptions)
            }
          } else {
            //this.alertService.error(JSON.stringify(x, null, 2), noneAutoClosedAlertOptions)
          }
        })
      )
    }
  }

  onClickClear() {

    this.writeValue(null);
    this.onChange(null);
    this.shownText = "";
   
  }

  ngAfterViewInit(): void {
    /**
     * This events get called by all clicks on the page
     */
    this.listenerFn = this.renderer.listen('window', 'click', (e: Event) => {
      /*
       * handle click outside
       */
      if (this.container && !!!this.container.nativeElement.contains(e.target)) {
        this.expandState = false;
      }
    });

    const maxZIndex = this.domService.getMaxZIndex();
    this.container.nativeElement.style.setProperty('--max-z-index', maxZIndex + 1);
    if (!!this.height) this.container.nativeElement.style.setProperty('--height', this.height);
  }

  ngOnDestroy(): void {
    if (this.listenerFn) this.listenerFn();
    this.subscriptions.map((x) => x?.unsubscribe());
  }

}
