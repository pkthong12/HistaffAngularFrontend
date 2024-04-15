import { Component, ElementRef, OnInit, OnDestroy, AfterViewInit, ViewChild, Input, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription, distinctUntilChanged, fromEvent } from 'rxjs';
import { DomService } from '../../services/dom.service';
import { IDataRow, CoreDatetimeService, IMonthIdentity } from 'src/app/libraries/services/core-datetime.service';
import { CoreFormControlBaseComponent } from '../../core-form-control-base/core-form-control-base.component';

import { MultiLanguageService } from 'src/app/services/multi-language.service';

export interface ICoreDatePickerRange {
  minDate: Date;
  maxDate: Date;
}

@Component({
  selector: 'core-date-picker',
  templateUrl: './core-date-picker.component.html',
  styleUrls: ['./core-date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CoreDatePickerComponent
    }
  ]
})
/*
  this component renders its main part and popup part
  the main part deals with user input from physical keyboard or touch keyboard
  the popup part consists of 1) navigator 2) header 3) calendar body container 4) calendar body
  the most important part of them is:
    4) calendar body:
      due variations the calendar body may reach to 6 rows of week day sub-array
    - for visual, logic and coding simplicity I will always render all the 6 rows
    so calendar body dimension stays unchanged
  
*/
export class CoreDatePickerComponent extends CoreFormControlBaseComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() enableTimeZoneConverter!: boolean;
  @Input() showPlaceholder: boolean = false;
  @Input() popupWidth: number = 300;
  @Input() popupXPadding: number = 12;
  @Input() rangeLimit!: ICoreDatePickerRange;
  @Input() override readonly!: boolean;
  @Input() override disabled!: boolean;


  listenerFn!: () => void;

  lang!: string;
  subscriptions: Subscription[] = [];
  openState: boolean = false;
  monthPickerActive: boolean = false;
  yearPickerActive: boolean = false;

  cellSize: number = (this.popupWidth - this.popupXPadding * 2) / 7;

  override value!: Date | null;
  pendingYear!: number;
  pendingMonthIndex!: number;
  pendingDay: number = this.value?.getDate()!;

  currentMonthObject$!: BehaviorSubject<IMonthIdentity>;
  newDate!: Date;

  currentMonthText!: string;
  currentHours!: number;
  currentMinutes!: number;
  currentSeconds!: number;
  currentMilliseconds!: number;

  data!: IDataRow[];
  headerWeekdays!: string[];
  direction: number = 1; // startup direction 1 | -1

  textValue: string = '';

  @ViewChild('container') container!: ElementRef;
  @ViewChild('input') input!: ElementRef;
  @ViewChild('backward') backward!: ElementRef;
  @ViewChild('calendarBody') calendarBody!: ElementRef;

  inputStream$!: Observable<any>;
  lastText!: string;

  constructor(
    private readonly renderer: Renderer2,
    private readonly domService: DomService,
    private readonly coreDatetimeService: CoreDatetimeService,
    private mls: MultiLanguageService
  ) {
    super();
  }

  ngOnInit(): void {

    this.newDate = !!this.rangeLimit ? this.rangeLimit.minDate : new Date();
    this.currentMonthObject$ = new BehaviorSubject<IMonthIdentity>({
      year: this.value?.getFullYear() || this.newDate.getFullYear(),
      monthIndex: this.value?.getMonth() || this.newDate.getMonth()
    });

    if (!!this.disabled) this.readonly = true;

    if (!!!this.value) {
      this.value = this.newDate;
      this.lastText = this.coreDatetimeService.dateToVnString(this.value)
    }
      
    this.pendingYear = this.value.getFullYear();
    this.pendingMonthIndex = this.value.getMonth();
    this.pendingDay = this.value.getDate();
    this.currentHours = this.value.getHours();
    this.currentMinutes = this.value.getMinutes();
    this.currentSeconds = this.value.getSeconds();
    this.currentMilliseconds = this.value.getMilliseconds();

    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )

    /*
    if (!!!this.id) {
      console.error(`
      within a page, tanleica-date-picker needs an unique property id value to work correctly
      for example: <tanleica-date-picker id="startDate" formControlName="startDate"></tanleica-date-picker>
      `)
    }
    */
    this.headerWeekdays = this.coreDatetimeService.getShortWeekdays(this.lang);
  }

  /*
    trigger animation by reflow the DOM
  */
  triggerReflow() {
    const el = this.calendarBody.nativeElement;
    //DOM manipulation
    if (this.direction === 1) {
      el.classList.remove("slide-up");
    } else {
      el.classList.remove("slide-down");
    }
    el.offsetHeight;  /* trigger reflow (alternative: el.offsetWidth) */
    if (this.direction === 1) {
      setTimeout(() => el.classList.add("slide-up"), 0); // pass the callback to Callback queue through WebAPIs, so it will be executed after DOM manipulation ends
    } else {
      setTimeout(() => el.classList.add("slide-down"), 0); // pass the callback to Callback queue through WebAPIs, so it will be executed after DOM manipulation ends
    }
  }

  ngAfterViewInit(): void {

    /*
      This events get called by all clicks on the page
    */
    this.listenerFn = this.renderer.listen('window', 'click', (e: Event) => {
      /*
        handle click outside
      */
      if (this.container && !!!this.container.nativeElement.contains(e.target)) {
        this.openState = false;
      }
    })

    const maxZIndex = this.domService.getMaxZIndex();

    this.container.nativeElement.style.setProperty('--indicator-height', (this.input.nativeElement.getBoundingClientRect().height - 6) + 'px')
    this.container.nativeElement.style.setProperty('--popup-z-index', maxZIndex);
    this.container.nativeElement.style.setProperty('--cell-size', this.cellSize + 'px')

    this.currentMonthObject$.pipe(
      distinctUntilChanged()
    ).subscribe(value => {
      setTimeout(() => {
        this.currentMonthText = this.coreDatetimeService.getMonthText(this.lang, value.monthIndex);
        console.log("Rebuilding....")
        this.buildBody(value.year, value.monthIndex);
        this.triggerReflow();
      }, 0)
    })

    this.inputStream$ = fromEvent(this.input.nativeElement, 'input');
    this.inputStream$.subscribe(event => {

      if ( event.inputType !== 'deleteContentBackward' 
        && '#0#1#2#3#4#5#6#7#8#9#Backspace#Delete'.indexOf('#' + event.data) < 0) 
      {
        event.target.value = this.lastText;
        this.markAsTouched();
        this.onChange(null);
        return;
      } else {
        this.lastText = event.target.value
      }

      var v = event.target.value;
      if (v.match(/^\d{2}$/) !== null) {
        event.target.value = v + '/';
        this.textValue = v + '/';
      } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
        event.target.value = v + '/';
        this.textValue = v + '/';
      } else {
        this.textValue = v;
      }

      if (this.textValue.length === 10) {
        const digits = this.textValue.split('/');
        const y = Number(digits[2]);
        const m = Number(digits[1]) - 1;
        const d = Number(digits[0]);

        if (y <= 0 || m < 0 || m > 11 || d < 1 || d > 31) {
          event.target.value = '';
          this.textValue = '';
          this.markAsTouched();
          this.onChange(null);
          return;
        }

        const now = new Date();
        const hr = now.getHours();
        const mn = now.getMinutes();
        const sd = now.getSeconds();
        const ms = now.getMilliseconds();

        const date = new Date(Number(digits[2]), Number(digits[1]) - 1, Number(digits[0]), hr, mn, sd, ms);
        event.target.value = this.coreDatetimeService.dateToVnString(date);
        this.markAsTouched();
        this.onChange(date);

      }
    })

  }

  override writeValue(obj: Date | null): void {
    console.log("UTC Date ", obj);

    const updateProperties = (value: Date) => {
      console.log("After convert to Local Date ", value);
      this.value = value;
      this.lastText = this.coreDatetimeService.dateToVnString(value)
      this.textValue = this.coreDatetimeService.dateToVnString(value);
      this.currentMonthObject$.next({
        year: value.getFullYear(),
        monthIndex: value.getMonth()
      })
      this.currentHours = value.getHours();
      this.currentMinutes = value.getMinutes();
      this.currentSeconds = value.getSeconds();
      this.currentMilliseconds = value.getMilliseconds();

      this.currentMonthText = this.coreDatetimeService.getMonthText(this.lang, this.currentMonthObject$.value.monthIndex);
      this.pendingYear = value.getFullYear();
      this.pendingMonthIndex = value.getMonth();
      this.pendingDay = value.getDate();
    }

    if (obj === null || obj === undefined) {
      let now = new Date();
      if (!!this.rangeLimit) {
        now = this.rangeLimit.minDate;
      }
      this.textValue = '';
      this.currentMonthObject$.next({
        year: now.getFullYear(),
        monthIndex: now.getMonth()
      })
      this.currentHours = now.getHours();
      this.currentMinutes = now.getMinutes();
      this.currentSeconds = now.getSeconds();
      this.currentMilliseconds = now.getMilliseconds();
      this.currentMonthText = this.coreDatetimeService.getMonthText(this.lang, this.currentMonthObject$.value.monthIndex);
    } else {
      /* Convert UTC date to local date */
      const originalDate: Date = new Date(obj);
      const offset = (new Date()).getTimezoneOffset();
      const dateValue = new Date(originalDate.getTime() - offset * 60000);
      /*--------------------------------------*/
      if (typeof obj!.getFullYear === 'function') {
        updateProperties(dateValue);
      } else if (typeof obj === 'string') {
        const isDate = this.coreDatetimeService.isDateString(obj);
        if (isDate) {
          //const _obj = new Date(obj); // convert string to date 
          updateProperties(dateValue);
        } else {
          console.error("Invalid date input: ", obj);
        }

      } else {
        console.error("Invalid date input: ", obj);
      }
    }
  }

  onItemClick(date: Date) {

    if (this.readonly) return;

    if (!!this.rangeLimit) {
      if (date < this.rangeLimit.minDate || date > this.rangeLimit.maxDate) return;
    }

    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const ms = now.getMilliseconds();
    date.setHours(h);
    date.setMinutes(m);
    date.setSeconds(s);
    date.setMilliseconds(ms);
    this.textValue = this.coreDatetimeService.dateToVnString(date);

    this.pendingYear = date.getFullYear();
    this.pendingMonthIndex = date.getMonth();
    this.pendingDay = date.getDate();

    this.markAsTouched();
    
    this.onChange(date);
    this.openState = false;
  }

  goToday() {
    const today = new Date();
    if (!!this.rangeLimit) {
      if (today < this.rangeLimit.minDate || today > this.rangeLimit.maxDate) return;
    }
    this.textValue = this.coreDatetimeService.dateToVnString(today);
    this.markAsTouched();
    this.onChange(today);
    this.openState = false;
  }

  clear() {
    this.textValue = '';
    this.value = null;
    this.lastText = '';
    this.markAsTouched();
    this.onChange(null);
    this.openState = false;
  }
  onChangeValue(event : string){
    if(!event || event == "") {
      this.clear()
    }
  }

  goBackward() {
    this.direction = -1;
    this.backward.nativeElement.checked = true;
    if (this.currentMonthObject$.value.monthIndex === 0) {
      this.currentMonthObject$.next({
        year: this.currentMonthObject$.value.year - 1,
        monthIndex: 11
      });
      this.currentMonthText = this.coreDatetimeService.getMonthText(this.lang, 11);
    } else {
      this.currentMonthObject$.next({
        year: this.currentMonthObject$.value.year,
        monthIndex: this.currentMonthObject$.value.monthIndex - 1
      });

      this.currentMonthText = this.coreDatetimeService.getMonthText(this.lang, this.currentMonthObject$.value.monthIndex);
    }
  }

  goForeward() {
    this.direction = 1;
    this.backward.nativeElement.checked = false;
    this
    if (this.currentMonthObject$.value.monthIndex === 11) {
      this.currentMonthObject$.next({
        year: this.currentMonthObject$.value.year + 1,
        monthIndex: 0
      });
      this.currentMonthText = this.coreDatetimeService.getMonthText(this.lang, 0);
    } else {
      this.currentMonthObject$.next({
        year: this.currentMonthObject$.value.year,
        monthIndex: this.currentMonthObject$.value.monthIndex + 1
      });
      this.currentMonthText = this.coreDatetimeService.getMonthText(this.lang, this.currentMonthObject$.value.monthIndex);
    }
  }

  /* Probably the most important function */
  buildBody(year: number, monthIndex: number) {
    const body = this.coreDatetimeService.getCalendarBody(year, monthIndex, this.direction);
    this.data = body.rows;
    this.container.nativeElement.style.setProperty('--scroll-distance', (body.rows.length - 6) * this.cellSize + 'px');
  }

  ngOnDestroy(): void {
    if (this.listenerFn) this.listenerFn();
    this.subscriptions.map(x => x?.unsubscribe())
  }

  toggleOpen() {
    if (!!this.readonly) return
    if (!!this.disabled) return
    this.openState = !this.openState;
  }

  toggleMonthPickerActive() {
    this.monthPickerActive = !this.monthPickerActive;
  }

  onMonthObjectChange(args: IMonthIdentity) {
    this.currentMonthObject$.next({
      year: args.year,
      monthIndex: args.monthIndex
    })
    this.monthPickerActive = false;
  }

  onMonthPickerYearClick(e: number) {
    this.monthPickerActive = false;
    this.yearPickerActive = true;
  }

  onYearPicked(e: number) {
    this.currentMonthObject$.next({
      year: e,
      monthIndex: this.currentMonthObject$.value.monthIndex
    });
    this.yearPickerActive = false;
    this.monthPickerActive = true;
  }

}
