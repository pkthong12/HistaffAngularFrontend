import { Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HubConnectionService {

  message!: any;
  hubConnection$ = new BehaviorSubject<HubConnection | null>(null);

  constructor() { }
}
