import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomService } from '../../services/dom.service';
import { Subscription } from 'rxjs';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

@Component({
  selector: 'app-base-dropdown',
  templateUrl: './base-dropdown.component.html',
  styleUrls: ['./base-dropdown.component.scss']
})
export class BaseDropdownComponent implements OnInit, OnDestroy {

  @ViewChild('container') container!: ElementRef;
  height!: number;
  lang!: string;
  subscriptions: Subscription[] = [];

  listenerFn!: () => void;
  expandState!: boolean;

  constructor(
    public mls: MultiLanguageService,
    public renderer: Renderer2,
    public domService: DomService,
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
  }

  ngOnDestroy(): void {
    if (this.listenerFn) this.listenerFn();
    this.subscriptions.map(x => x?.unsubscribe());
  }

}
