import {
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
  isDevMode,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

import { CoreFormControlBaseComponent } from '../../core-form-control-base/core-form-control-base.component';
import { BehaviorSubject, Subscription, filter } from 'rxjs';
import { DomService } from '../../services/dom.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { AlertService } from '../../alert/alert.service';
import { noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';

export interface ICoreChecklistOption {
  value: number | null;
  text: string;
  checked: boolean;
}

@Component({
  selector: 'core-checklist',
  templateUrl: './core-checklist.component.html',
  styleUrls: ['./core-checklist.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CoreChecklistComponent,
    },
  ],
})
export class CoreChecklistComponent extends CoreFormControlBaseComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  ngControl!: NgControl;
  @Input() paramMode!: boolean;
  @Input() getByIdObject$!: BehaviorSubject<any>;
  @Input() shownFrom!: string;
  @Input() options$!: BehaviorSubject<ICoreChecklistOption[]>;
  @Input() height!: string;
  @Input() placeholder: string = '';
  @Input() loading!: boolean;

  lang!: string;
  toggleAllValue: boolean = false;
  textCodeWhenAllSelected: EnumTranslateKey = EnumTranslateKey.UI_CORE_CHECKBOX_TEXT_WHEN_ALL_SELECTED

  @Input() override readonly!: boolean;
  @Input() override disabled!: boolean;

  @ViewChild('container') container!: ElementRef;

  listenerFn!: () => void;

  options!: ICoreChecklistOption[];

  localOptions!: ICoreChecklistOption[];
  override value!: any[];

  text!: string;
  textStringify!: string;
  searchText!: string;
  expandState!: boolean;

  subscriptions: Subscription[] = [];

  toggleAllText: EnumTranslateKey = EnumTranslateKey.UI_CORE_CONTROL_CHECKLIST_TOGGLE_CHECK_ALL;

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
    this.ngControl = this.injector.get(NgControl);

    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )

    /* START: CHECK INPUT ERROR */
    if (!!!this.options$ && isDevMode()) {
      this.alertService.error(
        `
        CoreChecklistComponent required this input: options$!: BehaviorSubject<ICoreDropdownOption[]>;
        Also, it needs to receive a new value that usually comes from and API GetAll() action
        `,
        noneAutoClosedAlertOptions,
      );
    }

    if (!!!this.paramMode) {
      //getByIdObject$
      if (!!!this.getByIdObject$ && isDevMode()) {
        this.alertService.error(
          `CoreChecklistComponent Error: Required inputs:
                getByIdObject$: BehaviorSubject&lt;any&gt; (for '${this.ngControl.name}')`,
        );
      }

      if (!!!this.shownFrom && (!!!this.options$.value || !!!this.options$.value.length)) {
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
        console.log("this.options$ changed: ", x)
        this.options = x;
        this.localOptions = x;

        if (!!this.value) {
          this.writeValue(this.value);
        }
      }),
    );

    this.subscriptions.push(
      this.getByIdObject$?.subscribe((x) => {
        if (!!x) {
          this.writeValue(x.id);
        } else {
          this.text = '';
          this.textStringify = '';
        }
      }),
    );
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
    if (!!this.height) this.container.nativeElement.style.setProperty('--height', this.height);
  }

  override writeValue(obj: any[]): void {
    this.value = obj;
    let newText = '';
    this.options?.map((x) => {
      // find item from input
      const filter = obj?.filter((i) => x.value === i);
      if (!!filter?.length) {
        x.checked = true;
        newText += x.text + '; ';
      } else {
        x.checked = false;
      }
    });
    this.text = newText;
    this.textStringify = this.text;

    if (!!obj) {
      this.toggleAllValue = obj.length === this.options?.length;
    } else {
      this.toggleAllValue = false;
    }
  }

  onSearchTextChange(value: string) {
    this.localOptions = this.options.filter((x) => x.text.toLowerCase().indexOf(value.toLocaleLowerCase()) >= 0);
  }

  toggleExpanded(): void {
    this.expandState = !!!this.expandState;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!!changes['options']) return;
    this.localOptions = changes['options']?.currentValue;
  }

  onToggleAllValueChange(e: boolean) {
    let newText = '';
    let newValue: any[] = [];

    if (e) {
      this.options.map((x) => {
        newText += x.text + '; ';
        newValue.push(x.value);
      });
    }

    this.writeValue(newValue);
    this.onChange(newValue);
  }

  onItemValueChange(option: ICoreChecklistOption, value: boolean): void {
    const filter = this.options.filter((x) => x.value === option.value);
    if (filter.length === 1) {
      filter[0].checked = value;
    } else {
      this.alertService.error(
        `${this.ngControl.name} error: The value ${option.value} is not unique or not found`,
        noneAutoClosedAlertOptions,
      );
    }
    let newText = '';
    let newValue: any[] = [];
    this.options
      ?.filter((x) => !!x.checked)
      .map((x) => {
        newText += x.text + '; ';
        newValue.push(x.value);
      });
    this.text = newText;
    this.value = newValue;
    this.onChange(this.value);
    this.toggleAllValue = newValue.length === this.options?.length;
  }

  ngOnDestroy(): void {
    if (this.listenerFn) this.listenerFn();
    this.subscriptions.map((x) => x?.unsubscribe());
  }
}
