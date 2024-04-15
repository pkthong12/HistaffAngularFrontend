import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  headerHeight$ = new BehaviorSubject<number>(96); // 96px is default header height - for desktop screen
  coreTableViewpotTop$ = new BehaviorSubject<number>(105);
  leftbarReduced$ = new BehaviorSubject<boolean>(false);
  

  /* IMPORTANT!!! 
    The most root basic props
  */

  // which change on: AppLayout AfterViewInit, AppLayout resize, Menu reducer click
  contentContainerHeight$ = new BehaviorSubject<number>(500); 
  contentContainerWidth$ = new BehaviorSubject<number>(500); 
  layoutHeaderHeight$ = new BehaviorSubject<number>(60); // Cần set lại mỗi lần Designer hoặc sếp muốn đổi giao ziện
  leftBarCurrentWidth$ = new BehaviorSubject<number>(280);
  
  // never changed
  corePageHeaderHeight: number = 50; // Cần set lại mỗi lần Designer hoặc sếp muốn đổi giao ziện
  corePaginationHeight: number = 50; // Cần set lại mỗi lần Designer hoặc sếp muốn đổi giao ziện
  coreTabsHeaderLineHeight: number = 45;
  basicSpacing: number = 15;
  tableBorderTop: number = 0;

  formControlHeight: number = 35;

  /*===================================*/

  //CoreOrgTree
  coreOrgTreeTopHeight : number = 60;
  coreOrgTreeBottomHeight : number = 50;
  /*===================================*/

  constructor() { }
}
