import { BehaviorSubject } from "rxjs";
import { ICoreButtonVNS } from "../core-button-group-vns/core-button-group-vns/ICoreButtonVNS";

export class CorePageListState {
    coreTableToolClick$ = new BehaviorSubject<ICoreButtonVNS | null>(null);
    id$ =  new BehaviorSubject<number | string | null>(null);
}