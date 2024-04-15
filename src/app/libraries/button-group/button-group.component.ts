import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICoreButton } from './core-button/ICoreButton';
import { CorePageListState } from '../core-page-list/core-page-list.state';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent implements OnInit {

  @Input() buttons: ICoreButton[] = [];
  @Output() buttonClick = new EventEmitter<ICoreButton>();

  constructor(
    private CorePageListState: CorePageListState,
  ) { }

  ngOnInit(): void {
  }

  onButtonClick(e: ICoreButton): void {
    console.log("button-group onButtonClick", e)
    this.buttonClick.emit(e);
  }

}
