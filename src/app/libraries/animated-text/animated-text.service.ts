import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimatedTextService {

  text$ = new BehaviorSubject<string>('Every day is a gift');

  constructor() { }
}
