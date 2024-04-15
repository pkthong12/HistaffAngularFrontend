import { ElementRef } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface ICoreCompositionInstance {
    instanceNumber: number;
    leftRef$: BehaviorSubject<ElementRef>;
    topRef$: BehaviorSubject<ElementRef>;
    mainRef$: BehaviorSubject<ElementRef>;
}