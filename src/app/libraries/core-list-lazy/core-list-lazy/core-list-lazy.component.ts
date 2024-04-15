import { AfterViewInit, Component, ElementRef, Injector, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { CoreFormControlBaseComponent } from '../../core-form-control-base/core-form-control-base.component';
import { BehaviorSubject, Subject, Subscription, debounceTime, distinctUntilChanged, filter, fromEvent, switchMap } from 'rxjs';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { AppService } from 'src/app/services/app.service';
import { ICoreListOption } from '../../core-list/core-list/core-list.component';
import { api } from 'src/app/constants/api/apiDefinitions';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';
import { HttpResponse } from '@angular/common/http';
import { EnumSortDirection, IPagination, IQueryListRequest } from 'src/app/interfaces/IQueryListRequest';
import { IQueryListResponse } from 'src/app/interfaces/IQueryListResponse';
import { EnumCoreTablePipeType } from '../../core-table/EnumCoreTablePipeType';

@Component({
  selector: 'core-list-lazy',
  templateUrl: './core-list-lazy.component.html',
  styleUrls: ['./core-list-lazy.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CoreListLazyComponent
    }
  ]
})
export class CoreListLazyComponent extends CoreFormControlBaseComponent implements OnChanges, OnInit, AfterViewInit {

  @Input() title!: EnumTranslateKey;
  @Input() queryListApi!: api;
  @Input() textField!: string;
  @Input() pipe!: EnumCoreTablePipeType;
  @Input() height!: number;

  @ViewChild('container') container!: ElementRef;
  @ViewChild('coreScrollContainer') coreScrollContainer!: ElementRef;

  ngControl!: NgControl;

  activeValue: any;

  subscriptions: Subscription[] = [];
  visibleOptions: ICoreListOption[] = [];
  placeholderText!: string;
  searchHeight: number = 50;
  searchText: string = "";
  placeholder = EnumTranslateKey.UI_COMMON_PLACE_HOLDER_SEARCH_HERE;
  text!: string;
  lang!: string;
  searchStream$ = new Subject<string>();

  itemHeight: number = 40;
  scrollContainerHeight!: number;
  listTotalHeight!: number;

  queryListRequest$ = new BehaviorSubject<IQueryListRequest>({});

  constructor(
    private mls: MultiLanguageService,
    private injector: Injector,
    private appService: AppService
  ) { super() }


  override writeValue(obj: any): void {
    this.value = obj;
    this.activeValue = obj;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['height']) {
      if (changes['height'].currentValue) {
        this.defaultResize(changes['height'].currentValue)
      }
    }

    if (changes['textField']) {
      if (!!changes['textField'].currentValue) {
        this.queryListRequest$.next({
          ...this.queryListRequest$.value,
          sort: [
            {
              field: changes['textField'].currentValue,
              sortDirection: EnumSortDirection.ASC
            }
          ]
        })
      }
    }
  }

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);

    this.subscriptions.push(
      this.mls.lang$.subscribe(x => {
        this.lang = x
        this.placeholderText = this.mls.trans(this.placeholder, x)
      })
    )

    this.subscriptions.push(
      this.searchStream$.pipe(
        filter(_ => !!this.textField),
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(text => {
        this.queryListRequest$.next({
          ...this.queryListRequest$.value,
          search: [
            {
              field: this.textField,
              searchFor: text
            }
          ]
        })
      })
    )

  }

  bindOptions(x: HttpResponse<any>): void {

    if (x.ok && x.status === 200) {
      const body: IFormatedResponse = x.body;
      if (body.statusCode === 200) {

        const listResponse: IQueryListResponse = body.innerBody;

        const newListOptions: ICoreListOption[] = [];
        listResponse.list?.map((item: any) => {
          newListOptions.push({
            value: item.id,
            text: item[this.textField]
          })
        })
        this.visibleOptions = newListOptions;
        this.listTotalHeight = listResponse.count! * this.itemHeight;
      }
    }
  }

  defaultResize(height: number | undefined): void {
    if (!height) return
    // 35 = search
    // 2*15 = padding
    // 1*15 = search margin bottom
    const h5 = height! - 35 - 2*15 - 1*15;
    this.container.nativeElement.style.setProperty('--core-scroll-container-height', h5 + 'px');
    this.scrollContainerHeight = h5;
    this.queryListRequest$.next({
      ...this.queryListRequest$.value,
      pagination: {
        skip: 0,
        take: Math.ceil(h5 / this.itemHeight)
      }
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.queryListRequest$
          .pipe(
            filter(_ => !!this.queryListApi),
            switchMap(x => this.appService.post(this.queryListApi, x))
          )
          .subscribe(x => {
            console.log("this.queryListRequest$", x)
            this.bindOptions(x);
          })
      )
      this.defaultResize(this.height);
    })
  }

  onListItemClick(option: ICoreListOption) {
    this.writeValue(option.value);
    this.markAsTouched();
    this.onChange(option.value);
    this.activeValue = option.value;
  }

  onSearchTextChange(e: any) {
    this.searchStream$.next(e);
  }

  onPagination(e: IPagination | undefined): void {
    this.queryListRequest$.next({
      ...this.queryListRequest$.value,
      pagination: e
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe());
  }

}
