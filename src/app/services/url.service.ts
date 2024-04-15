import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  previousRouteUrl$ = new BehaviorSubject<string>('');
  currentRouteUrl$ = new BehaviorSubject<string>('');

  constructor() { }
}
