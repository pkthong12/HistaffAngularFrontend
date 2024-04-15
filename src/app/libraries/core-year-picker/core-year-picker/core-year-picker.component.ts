import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CoreDatetimeService, IDecadeYearsObject } from 'src/app/libraries/services/core-datetime.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'core-year-picker',
  templateUrl: './core-year-picker.component.html',
  styleUrls: ['./core-year-picker.component.scss']
})
export class CoreYearPickerComponent implements OnInit {

  @Input() id!: string;
  @Input() default: number = new Date().getFullYear();
  @Output() onChange = new EventEmitter<number>();

  @ViewChild('yearsContainer') yearsContainer!: ElementRef;

  year$ = new BehaviorSubject<number>(this.default);
  decadeYearsObject!: IDecadeYearsObject;

  constructor(private coreDatetimeService: CoreDatetimeService) { }

  ngOnInit(): void {
    this.year$.subscribe(curentYear => {
      this.decadeYearsObject = this.coreDatetimeService.getDecadeYearsObject(curentYear);
    })
  }

  onClick(e: number) {
    this.default = e;
    this.onChange.emit(e);
  }

  triggerReflow() {
    const element = this.yearsContainer.nativeElement;
    element.classList.remove("zoom-in");
    element.offsetWidth;
    setTimeout(() => element.classList.add("zoom-in"));
  }

  goUp() {
    this.year$.next(this.year$.value - 10);
    this.triggerReflow();
  }

  goDown() {
    this.year$.next(this.year$.value + 10);
    this.triggerReflow();
  }

}
