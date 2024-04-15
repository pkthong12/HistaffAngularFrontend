import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { CoreDatetimeService, IMonthIdentity } from '../../services/core-datetime.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CoreFormControlBaseComponent } from '../../core-form-control-base/core-form-control-base.component';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { DomService } from '../../services/dom.service';

@Component({
  selector: 'core-month-selector',
  templateUrl: './core-month-selector.component.html',
  styleUrls: ['./core-month-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CoreMonthSelectorComponent
    }
  ]
})
export class CoreMonthSelectorComponent extends CoreFormControlBaseComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() onYearClick = new EventEmitter<number>();
  @ViewChild('container') container!: ElementRef;
  @ViewChild('monthsContainer') monthsContainer!: ElementRef;

  override value!: string;

  lang: string = 'vi';
  monthObject$!: BehaviorSubject<IMonthIdentity>;
  listenerFn!: () => void;

  override writeValue(obj: string): void {
    this.value = obj;
    this.updateTextValue();

    if (!obj) {
      const now = new Date();
      this.monthObject$.next({
        year: now.getFullYear(),
        monthIndex: now.getMonth()
      })
    } else {
      this.monthObject$.next({
        year: Number(obj.split('-')[0]),
        monthIndex: Number(obj.split('-')[1]) - 1
      })
    }
  }

  updateTextValue(): void {
    if (!!this.value) {
      const year = Number(this.value.split('-')[0]);
      const monthIndex = Number(this.value.split('-')[1]) - 1;
      this.textValue = this.monthStringArray[monthIndex] + ', ' + year
    } else {
      this.textValue = "";
    }
  }

  months: string[][] = [];
  year!: number;
  textValue!: string;

  yearPickerActive!: boolean;
  openState!: boolean;

  subscriptions: Subscription[] = [];
  monthStringArray!: string[];

  constructor(
    private coreDatetimeService: CoreDatetimeService,
    private mls: MultiLanguageService,
    private readonly renderer: Renderer2,
    private readonly domService: DomService,

  ) {
    super();

    const monthStrings = this.coreDatetimeService.getMonthNames(this.lang || 'vi');
    this.monthStringArray = monthStrings;
    this.months = [
      [monthStrings[0], monthStrings[1], monthStrings[2]],
      [monthStrings[3], monthStrings[4], monthStrings[5]],
      [monthStrings[6], monthStrings[7], monthStrings[8]],
      [monthStrings[9], monthStrings[10], monthStrings[11]]
    ];


    const now = new Date();
    this.monthObject$ = new BehaviorSubject<IMonthIdentity>({
      year: now.getFullYear(),
      monthIndex: now.getMonth()
    });
  }

  ngOnInit(): void {

    this.monthObject$.subscribe(x => {
      this.year = x.year;
    })

    this.subscriptions.push(
      this.mls.lang$.subscribe(x => {
        this.lang = x

        const monthStrings = this.coreDatetimeService.getMonthNames(x);
        this.monthStringArray = monthStrings;
        this.months = [
          [monthStrings[0], monthStrings[1], monthStrings[2]],
          [monthStrings[3], monthStrings[4], monthStrings[5]],
          [monthStrings[6], monthStrings[7], monthStrings[8]],
          [monthStrings[9], monthStrings[10], monthStrings[11]]
        ];

        this.updateTextValue();
    
      })
    )


  }

  ngAfterViewInit(): void {
    this.listenerFn = this.renderer.listen('window', 'click', (e: Event) => {
      if (this.container && !!!this.container.nativeElement.contains(e.target)) {
        this.openState = false;
      }
    })

    const maxZIndex = this.domService.getMaxZIndex();
    this.container.nativeElement.style.setProperty('--popup-z-index', maxZIndex);

  }

  onClick(rowIndex: number, subMonthIndex: number) {
    this.monthObject$.next({
      year: this.year,
      monthIndex: rowIndex * 3 + subMonthIndex
    });
    const newValue = this.coreDatetimeService.monthIdentityToMonthString(this.monthObject$.value)
    this.writeValue(newValue);
    this.onChange(newValue);
    this.markAsTouched();
    this.openState = false;
  }

  triggerReflow() {
    const element = this.monthsContainer.nativeElement;
    element.classList.remove("zoom-in");
    element.offsetWidth;
    setTimeout(() => element.classList.add("zoom-in"));
  }

  goUp() {
    this.year -= 1;
    this.triggerReflow();
  }

  goDown() {
    this.year += 1;
    this.triggerReflow();
  }

  onYearClickLocal(year: number) {
    this.yearPickerActive = true;
  }

  onYearPicked(e: any): void {
    this.year = e;
    this.yearPickerActive = false;
  }

  toggleOpen() {
    if (!!this.readonly) return
    if (!!this.disabled) return
    this.openState = !this.openState;
  }

  clear() {
    this.value = '';
    this.textValue = '';
    this.markAsTouched();
    this.onChange('');
    this.openState = false;
  }

  goThisMonth() {
    const today = new Date();
    this.value = this.coreDatetimeService.dateToMonthString(today);
    this.updateTextValue();
    this.markAsTouched();
    this.onChange(today);
    this.openState = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
    if (this.listenerFn) this.listenerFn();
  }

}
