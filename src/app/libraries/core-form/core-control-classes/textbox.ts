import { ControlBase } from "./control-base";
import { EnumFormBaseContolType } from "../core-form/enum-interfaces";

export class Textbox extends ControlBase<string> {
  override controlType = EnumFormBaseContolType.TEXTBOX;
}
