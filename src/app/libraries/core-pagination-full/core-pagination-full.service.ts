import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorePaginationFullService {

  height$ = new BehaviorSubject<number>(50);

  constructor() { }
}
