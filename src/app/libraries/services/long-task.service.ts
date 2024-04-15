import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ILongTaskServiceData {
  outerMessage: string;
  outerPercent: string;
  innerMessage: string;
  innerPercent: string;
}

@Injectable({
  providedIn: 'root'
})
export class LongTaskService {

  message$ = new BehaviorSubject<string>('')
  data$ = new BehaviorSubject<ILongTaskServiceData | null>(null)
  error$ = new BehaviorSubject<boolean>(false)

  constructor() { }
}
