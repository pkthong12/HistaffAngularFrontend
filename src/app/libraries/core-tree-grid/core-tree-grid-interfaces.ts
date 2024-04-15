import { FormGroup } from "@angular/forms";
import { IFormBaseControl } from "../core-form/core-form/enum-interfaces";
import { ICoreTableColumnItem } from "../core-table/core-table.component";
import { BehaviorSubject } from "rxjs";

export interface ICoreTreeGridColumnItem extends ICoreTableColumnItem {
    control?: IFormBaseControl;
    form?: FormGroup;
    checkError$?: BehaviorSubject<boolean>;
}