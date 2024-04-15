import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class CoreAccordionService {
  heightList$ =  new BehaviorSubject<number[]>([]);
   
  
    constructor() { }
  }