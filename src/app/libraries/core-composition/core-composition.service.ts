import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICoreCompositionInstance } from './ICoreCompositionInstance';

@Injectable({
  providedIn: 'root'
})
export class CoreCompositionService {

  instances: ICoreCompositionInstance[] = [];

  topRef!: ElementRef | null;
  leftRef!: ElementRef | null;
  mainRef!: ElementRef | null;

  leftPartReduced$ = new BehaviorSubject<boolean>(false);
  mainViewpotY$ = new BehaviorSubject<number>(44);

  constructor() { }
}
