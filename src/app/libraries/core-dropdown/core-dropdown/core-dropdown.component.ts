import { AfterViewInit, Component, ElementRef, Injector, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewChild, ViewEncapsulation, isDevMode, } from '@angular/core';
import { CoreFormControlBaseComponent } from '../../core-form-control-base/core-form-control-base.component';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { BehaviorSubject, Subscription, filter } from 'rxjs';
import { DomService } from '../../services/dom.service';
import { AlertService } from '../../alert/alert.service';
import { noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

export interface ICoreDropdownOption {
  value: number | null;
  text: string;
  code?: string;
}

@Component({
  selector: 'core-dropdown',
  templateUrl: './core-dropdown.component.html',
  styleUrls: ['./core-dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CoreDropdownComponent,
    },
  ],
})
export class CoreDropdownComponent extends CoreFormControlBaseComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  ngControl!: NgControl;

  @Input() getByIdObject$!: BehaviorSubject<any>;
  @Input() paramMode!: boolean;
  @Input() shownFrom!: string; // take this field from GetById response innerBody to bind to the text
  @Input() options$!: BehaviorSubject<ICoreDropdownOption[]>;
  @Input() height!: string;
  @Input() placeholder: string = 'UI_COMMON_PLACE_HOLDER_SEARCH_HERE';
  @Input() loading!: boolean;
  @Input() warningDisable!: boolean;
  @Input() itemHeight!: number;
  @ViewChild('container') container!: ElementRef;

  listenerFn!: () => void;

  options!: ICoreDropdownOption[];

  localOptions!: ICoreDropdownOption[];
  override value!: string | number | null;

  lang!: string;
  placeholderText!: string;
  text!: string;
  searchText!: string;
  searchHeight: number = 38;
  expandState!: boolean;

  subscriptions: Subscription[] = [];

  constructor(
    private renderer: Renderer2,
    private domService: DomService,
    private alertService: AlertService,
    private injector: Injector,
    private mls: MultiLanguageService,
  ) {
    super();

  }

  ngOnInit(): void {

    if (!!!this.itemHeight) this.itemHeight = 40;

    this.ngControl = this.injector.get(NgControl);

    /* START: CHECK INPUT ERROR */
    if (!!!this.options$ && isDevMode() && !!!this.warningDisable) {
      this.alertService.error(
        `
        CoreDropdownComponent required this input: options$!: BehaviorSubject<ICoreDropdownOption[]>;
        Also, it needs to receive a new value that usually comes from and API GetAll() action
        `,
        noneAutoClosedAlertOptions,
      );
    }

    if (!!!this.paramMode) {
      //getByIdObject$
      if (!!!this.getByIdObject$ && isDevMode() && !!!this.warningDisable) {
        this.alertService.error(
          `CoreDropdownComponent Error: Required inputs:
                getByIdObject$: BehaviorSubject&lt;any&gt; (for '${this.ngControl.name}')`,
        );
      }

      if (!!!this.shownFrom && isDevMode() && !!!this.warningDisable) {
        this.alertService.error(
          `CoreDropdownComponent Error: Required inputs:
              shownFrom: string; (for '${this.ngControl.name}')`,
          noneAutoClosedAlertOptions,
        );
      }
    }

    /* END: CHECK INPUT ERROR */

    this.subscriptions.push(
      this.options$.subscribe((x) => {
        this.options = x;
        this.localOptions = x;
        if (!!this.value) {
          this.text = this.options.filter(m => m.value === this.value)[0]?.text
        }
      }),
    );

    this.subscriptions.push(
      this.getByIdObject$?.subscribe((x) => {
        if (!!x) {
          this.text = x[this.shownFrom];
        } else {
          this.text = '';
        }
      }),
    );

    this.subscriptions.push(
      this.mls.lang$.subscribe(x => {
        this.lang = x;
        this.placeholderText = this.mls.trans(this.placeholder, x)
      })
    )

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
        this.searchText = '';
        this.localOptions = this.options$.value;
      }
    });

    const maxZIndex = this.domService.getMaxZIndex();
    this.container.nativeElement.style.setProperty('--max-z-index', maxZIndex + 1);
    this.container.nativeElement.style.setProperty('--search-height', this.searchHeight + 'px');
    this.container.nativeElement.style.setProperty('--item-height', this.itemHeight + 'px');
    if (!!this.height) this.container.nativeElement.style.setProperty('--height', this.height);
  }

  override writeValue(obj: string | number | null): void {
    this.value = obj;
    const filter = this.options?.filter(m => m.value === obj)
    if (!!filter?.length) {
      this.text = this.options.filter(m => m.value === obj)[0].text
    } else {
      this.text = ""
    }

  }

  onSearchTextChange(value: string) {
    debugger
    this.localOptions = this.options.filter((x) => x.text.toLowerCase().indexOf(value.toLocaleLowerCase()) >= 0);
  }

  onListItemClick(option: ICoreDropdownOption): void {
    if (this.disabled) return;
    this.writeValue(option.value)
    // this.text = option.text;
    this.markAsTouched(); // do this before onChange
    this.onChange(option.value);
    this.expandState = false;
  }

  toggleExpanded(): void {
    if (this.disabled || this.readonly) return;
    this.expandState = !!!this.expandState;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!!changes['options']) return;
    this.localOptions = changes['options']?.currentValue;
  }

  onClickClear() {
    this.writeValue(null);
    this.markAsTouched();
    this.onChange(null);
  }

  ngOnDestroy(): void {
    if (this.listenerFn) this.listenerFn();
    this.subscriptions.map((x) => x?.unsubscribe());
  }
}
