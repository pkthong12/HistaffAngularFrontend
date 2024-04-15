import { ElementRef } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface ICorePageListInstance {
    instanceNumber: number;
    coreTableRef?: ElementRef;
    reloadFlag$: BehaviorSubject<boolean>;
    id$: BehaviorSubject<any>;
    tbodyHeight$: BehaviorSubject<any>;
}