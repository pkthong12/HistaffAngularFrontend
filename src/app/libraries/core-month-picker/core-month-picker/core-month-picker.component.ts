import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CoreDatetimeService, IMonthIdentity } from 'src/app/libraries/services/core-datetime.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'core-month-picker',
  templateUrl: './core-month-picker.component.html',
  styleUrls: ['./core-month-picker.component.scss']
})
export class CoreMonthPickerComponent implements OnInit {

  @Input() id!: string;
  @Input() lang: string = 'en';
  @Input() monthObject$ = new BehaviorSubject<IMonthIdentity>({
    year: 2022,
    monthIndex: 10,
  });
  @Output() onChange = new EventEmitter<IMonthIdentity>();
  @Output() onYearClick = new EventEmitter<number>();

  @ViewChild('monthsContainer') monthsContainer!: ElementRef;

  months: string[][] = [];
  year!: number;

  constructor(private coreDatetimeService: CoreDatetimeService) { }

  ngOnInit(): void {
    const monthStrings = this.coreDatetimeService.getMonthNames(this.lang);
    this.months = [
      [monthStrings[0], monthStrings[1], monthStrings[2]],
      [monthStrings[3], monthStrings[4], monthStrings[5]],
      [monthStrings[6], monthStrings[7], monthStrings[8]],
      [monthStrings[9], monthStrings[10], monthStrings[11]]
    ];

    this.monthObject$.subscribe(x => {
      this.year = x.year;
    })
    
  }

  onClick(rowIndex: number, subMonthIndex: number) {
    this.monthObject$.next({
      year: this.year,
      monthIndex: rowIndex * 3 + subMonthIndex      
    });
    this.onChange.emit(this.monthObject$.value);
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
    this.onYearClick.emit(year);
  }

}
