import { ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class CoreCompositionState {

  topRef!: ElementRef | null;
  leftRef!: ElementRef | null;
  mainRef!: ElementRef | null;

  leftPartReduced$ = new BehaviorSubject<boolean>(true);
  mainViewpotY$ = new BehaviorSubject<number>(44);
  width$ = new BehaviorSubject<number | undefined>(undefined);
  height$ = new BehaviorSubject<number | undefined>(undefined);

  constructor() { }
}
