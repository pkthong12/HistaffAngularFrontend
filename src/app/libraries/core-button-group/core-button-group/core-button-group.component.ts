import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICoreButton } from '../core-button/ICoreButton';
import { EnumCoreButtonCode } from '../core-button/EnumButtonCaptionCode';
import { EnumIconClass } from 'src/app/enum/EnumIconClass';

const CORE_BUTTONS: ICoreButton[] = [
  {
    code: EnumCoreButtonCode.CREATE,
    iconClass: EnumIconClass.FEATHER_ADD,
  },
  {
    code: EnumCoreButtonCode.EDIT,
    iconClass: EnumIconClass.FEATHER_EDIT,
  },
  {
    code: EnumCoreButtonCode.SAVE,
    iconClass: EnumIconClass.FEATHER_SAVE,
  },
  {
    code: EnumCoreButtonCode.APPROVE,
    iconClass: EnumIconClass.FEATHER_APPROVE,
  },
  {
    code: EnumCoreButtonCode.REJECT,
    iconClass: EnumIconClass.FEATHER_REJECT,
  },
  {
    code: EnumCoreButtonCode.DELETE,
    iconClass: EnumIconClass.FEATHER_DELETE,
  },
];

@Component({
  selector: 'core-button-group',
  templateUrl: './core-button-group.component.html',
  styleUrls: ['./core-button-group.component.scss']
})
export class CoreButtonGroupComponent implements OnInit {

  @Input() shownItems!: EnumCoreButtonCode[];
  @Output() buttonClick = new EventEmitter<ICoreButton>();

  buttons: ICoreButton[] = [];

  constructor() {
  }

  ngOnInit(): void {
    if (!!!this.shownItems) {
      this.buttons = CORE_BUTTONS
    } else {
      this.buttons = CORE_BUTTONS.filter(x => this.shownItems.includes(x.code))
    }
  }

  onButtonClick(e: ICoreButton): void {
    console.log("button-group onButtonClick", e)
    this.buttonClick.emit(e);
  }

}
