import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICoreButton } from './ICoreButton';

import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-core-button',
  templateUrl: './core-button.component.html',
  styleUrls: ['./core-button.component.scss']
})
export class CoreButtonComponent implements OnInit {

  @Input() data!: ICoreButton;
  @Input() showCaption: boolean = false;
  @Output() buttonClick = new EventEmitter<ICoreButton>();

  lang!: string
  subscriptions: Subscription[] = [];

  constructor(
    private mls: MultiLanguageService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
  }

  onButtonClick(): void {
    console.log("core-button onButtonClick")
    this.buttonClick.emit(this.data);
  }

}
