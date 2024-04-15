import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICoreButton } from './ICoreButton';
import { CorePageListState } from '../../core-page-list/core-page-list.state';

@Component({
  selector: 'app-core-button',
  templateUrl: './core-button.component.html',
  styleUrls: ['./core-button.component.scss']
})
export class CoreButtonComponent implements OnInit {

  @Input() data!: ICoreButton;
  @Input() showCaption: boolean = false;
  @Output() buttonClick = new EventEmitter<ICoreButton>();

  constructor(
    private CorePageListState: CorePageListState
  ) { }

  ngOnInit(): void {
  }

  onButtonClick(): void {
    console.log("core-button onButtonClick")
    this.buttonClick.emit(this.data);
  }

}
