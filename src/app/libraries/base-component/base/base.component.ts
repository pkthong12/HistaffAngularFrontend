import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit, OnDestroy {

  lang!: string;
  subscriptions: Subscription[] = [];

  constructor(
    public mls: MultiLanguageService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe());
  }

}
