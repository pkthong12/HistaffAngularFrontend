import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'core-reducer-icon',
  templateUrl: './core-reducer-icon.component.html',
  styleUrls: ['./core-reducer-icon.component.scss']
})
export class CoreReducerIconComponent implements OnInit {

  @Input() reduced$!: BehaviorSubject<boolean>;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.reduced$.next(!this.reduced$.value);
    
  }

}
