import { Component, ElementRef, OnInit, ViewChild, Input, TemplateRef, OnDestroy, AfterViewInit, isDevMode } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { NavigatorService } from './navigator.service';
import { SysMenuService } from 'src/app/services/sys-menu.service';
import { RecursiveService } from '../../services/recursive.service';
import { IRightIcon } from './IRightIcon';
import { INavigatorItem } from './INavigatorItem';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { MenuService } from 'src/app/services/menu.service';
import { IFormatedResponse } from 'src/app/interfaces/IFormatedResponse';

import { OrganizationService } from 'src/app/services/organization.service';
import { AuthService } from 'src/app/services/auth.service';
import { LayoutService } from 'src/app/services/layout.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { AlertService } from '../../alert/alert.service';
import { noneAutoClosedAlertOptions } from 'src/app/constants/alertOptions';

interface IFlatNavigationCheck {
  id: number;
  count: number;
}

@Component({
  selector: 'corelib-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements AfterViewInit, OnDestroy {

  @ViewChild("mainMenu") mainMenu!: ElementRef;
  listenerFn!: () => void;

  items!: INavigatorItem[];

  @Input() logoTemplate!: TemplateRef<any>;
  @Input() rightPartHeadeMenuItem!: INavigatorItem;
  @Input() rightIcon!: IRightIcon;

  linerItems$ = new BehaviorSubject<INavigatorItem[]>([]);

  subscriptions: Subscription[] = [];

  flatNavigationCheck: IFlatNavigationCheck[] = [];
  itemsErrors: string[] = [];
  leftbarReduced!: boolean;

  loading!: boolean;
  placeholder: string = '';
  searchFor: string = '';
  searchStream$ = new BehaviorSubject<string>('');
  menuClickedItem! : INavigatorItem
  checkedLoadingMenu: boolean = false;

  constructor(
    private navigatorService: NavigatorService,
    private sysMenuService: SysMenuService,
    private recursiveService: RecursiveService,
    private router: Router,
    private menuService: MenuService,
    private organizationService: OrganizationService,
    private layoutService: LayoutService,
    private mls: MultiLanguageService,
    private authService: AuthService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {

    this.menuClickedItem = JSON.parse(localStorage.getItem('menuCurrentClicked')!)
    if(!!this.menuClickedItem){
      this.menuClickedItem.tree$Selected = true;
    }
    setTimeout(() => {
      this.subscriptions.push(
        this.linerItems$.subscribe(x => {
          if(!!x && x.length > 0 && this.checkedLoadingMenu == false){
            let array : INavigatorItem[] = [];
            let arrayParrent : INavigatorItem[] = [];
            if(this.menuClickedItem?.tree$Tier == 2){
              array = x.filter(y => y.id == this.menuClickedItem.id)
              arrayParrent = x.filter(y => y.id == this.menuClickedItem.tree$Parent)
              array[0].tree$Selected =true
              if(this.menuClickedItem.tree$Children.length > 0){
                array[0].tree$Expanded = true
              }
              arrayParrent[0].tree$Selected = true;
              arrayParrent[0].tree$Expanded = true;
              let element = document.getElementById('main-menu-' + arrayParrent[0].id)
              let element2 = document.getElementById('main-menu-' + array[0].id)
              if (arrayParrent[0].tree$Expanded) {
                element?.classList.add('expanded')
                
                this.items.forEach(els => {
                  if(els.id == arrayParrent[0].id){
                    els.tree$Selected = true;
                    els.tree$Expanded = true;
                    if(els.tree$Children.length > 0){
                      els.tree$Children.map(x => {
                        if(x.id == this.menuClickedItem.id){
                          x.tree$Selected = true;

                        }
                      })
                    }
                    
                  }
                });
              } else {
                element?.classList.remove('expanded')
              }
              if (arrayParrent[0].tree$Active) {
                element?.classList.add('active')
              } else {
                element?.classList.remove('active')
              }

              if(array[0].tree$Expanded){
                element2?.classList.add('expanded')
                this.items.map(els => {
                  els.tree$Children.map(el => {
                    if(el.id == array[0].id){
                      el.tree$Selected = true;

                    }
                    if(this.router.url == el.url){
                      el.tree$Selected = true;
                    }
                  })
                });
              }else {
                element2?.classList.remove('expanded')
              }
            } 
            else if(this.menuClickedItem?.tree$Tier == 3){ //nếu là 3 cấp
              array = x.filter(y => y.id == this.menuClickedItem.id)
              arrayParrent = x.filter(y => y.id == this.menuClickedItem.tree$Parent)
              let arrayGrandParrent = x.filter(z => z.id == arrayParrent[0].parent)
              let element = document.getElementById('main-menu-' + arrayParrent[0].id)
              let element2 = document.getElementById('main-menu-' + arrayGrandParrent[0].id)
              array[0].tree$Selected =true
              arrayParrent[0].tree$Selected = true;
              arrayParrent[0].tree$Expanded = true;
              arrayGrandParrent[0].tree$Selected = true;
              arrayGrandParrent[0].tree$Expanded = true;
              
              if (arrayGrandParrent[0].tree$Expanded) {
                element2?.classList.add('expanded')
                
                this.items.forEach(els => {
                  if(els.id == arrayGrandParrent[0].id){
                    els.tree$Selected = true;
                    els.tree$Expanded = true;
                    // if(els.tree$Children.length > 0){
                    //   els.tree$Children.map(x => {
                    //     if(x.id == this.menuClickedItem.id){
                    //       x.tree$Selected = true
                    //     }
                    //   })
                    // }
                    
                  }
                });
              } else {
                element2?.classList.remove('expanded')
              }
              if (arrayGrandParrent[0].tree$Active) {
                element2?.classList.add('active')
              } else {
                element2?.classList.remove('active')
              }
              
              if (arrayParrent[0].tree$Expanded) {
                element?.classList.add('expanded')
                
                this.items.forEach(els => {
                  if(els.id == arrayGrandParrent[0].id){
                    els.tree$Selected = true;
                    els.tree$Expanded = true;
                    if(els.tree$Children.length > 0){
                      els.tree$Children.map(x => {
                        if(x.id == arrayParrent[0].id){
                          x.tree$Selected = true;
                          x.tree$Expanded = true;
                        }
                        if(x.tree$Children.length > 0){
                          x.tree$Children.map(y => {
                            if(y.id == array[0].id){
                              y.tree$Selected = true;
                            }
                          })
                        }
                      })
                    }
                    
                  }
                });
              } else {
                element?.classList.remove('expanded')
              }
              if (arrayParrent[0].tree$Active) {
                element?.classList.add('active')
              } else {
                element?.classList.remove('active')
              }

              
            }
          }
          this.checkedLoadingMenu = true
        })
      )
    },2000)
    
    // this.subscriptions.push(
    //   this.menuService.navigation$.subscribe((menuItems : INavigatorItem[]) => {
    //     // x.filter(x =>x.tree$Children?.includes(this.menuClickedItem))
    //     menuItems.map(parent => {
    //       if(parent.tree$Children.length > 0){
    //         parent.tree$Children.map(item => {
    //           if(item.tree$Children.length == 0){
    //             if(item.id == this.menuClickedItem.id){
    //               item.tree$Selected = true;
    //               item.tree$Expanded = true;
    //             }
    //           }else if (item.tree$Children.length > 0){
                
                
    //           }
    //         })
    //       }
    //     })
    //   })
    // )
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.subscriptions.push(
        this.layoutService.leftbarReduced$.subscribe(x => this.leftbarReduced = x)
      )
      this.subscriptions.push(
        this.mls.lang$.subscribe(x => this.placeholder = this.mls.trans('UI_COMMON_PLACE_HOLDER_SEARCH_HERE'))
      )

      this.subscriptions.push(
        this.searchStream$
          .pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap((text) => {
              console.log('switchMap works ==========================');
              this.loading = true;
              return this.navigatorService.findItem(text, this.items);
            })
          )
          .subscribe((x) => {
            this.loading = false;
          })
      );

      this.items?.map((item: INavigatorItem) => {
        this.validateNavigationItem(item);
      });

      if (!!this.itemsErrors.length) {
        console.group("Navigation items error");
        this.itemsErrors?.map(error => {
          console.error(error);
        })
        console.groupEnd();
      }

      this.subscriptions.push(

        this.authService.data$.pipe(
          filter(x => !!x),
          map(x => x?.id),
          switchMap(x => this.sysMenuService.readPermittedMenu(x!))
        ).subscribe(x => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            body.innerBody.sort((a: any, b: any) => {
              // in recursive code we will read from bottom to top
              if (a.orderNumber > b.orderNumber) return -1;
              if (a.orderNumber === b.orderNumber) return 0;
              if (a.orderNumber < b.orderNumber) return 1;
              return 0;
            })
            this.linerItems$.next(JSON.parse(JSON.stringify(body.innerBody)));

            this.subscriptions.push(

              this.recursiveService.linerArrayToNestedArray(
                body.innerBody,
                "id",
                "code",
                "parent", undefined, undefined, undefined,
                this.organizationService.status$.value,
                "orderNum"
              ).subscribe(r => {
                this.items = r.list;
                this.menuService.navigation$.next(r.list);
              })
            )
          } else {
            //if (isDevMode())
            //this.alertService.error(JSON.stringify(x, null, 2), noneAutoClosedAlertOptions)
          }
        })
      )

      this.subscriptions.push(
        this.navigatorService.clickedItem$.pipe(
          filter(x => !!x)
        ).subscribe(x => {
          this.onItemClick(x!);
          if (x?.tree$Children && x?.tree$Children.length > 0) {
            
            if(!!this.items)
            {
              let itemActivated = this.items.filter(y => y !== x && y.id !== x.tree$Parent && y.tree$Selected == true)
              itemActivated?.map(z => z.tree$Selected = false)
            }
            // else{
            //   let menu = localStorage.getItem('menuItems')
            //   if(!!menu){
            //     this.items = JSON.parse(menu)
            //     console.log(this.items)
                
            //   }
            // }
            
          } else {
            if (!!x && !!x.parent) {
              this.items.map(parent => {
                parent.tree$Children.map(child => {
                  if (child.tree$Children.length == 0 && child != x) {
                    child.tree$Selected = false;
                  }else if(child.tree$Children.length > 0){
                    child.tree$Children.map(k => {
                      if(child.id != k.parent){
                        child.tree$Selected = false;
                      }
                      else{
                        if(child != x && x.parent != child.id){
                          // if(x.id == )
                          child.tree$Selected = false;
                        }else if (x.parent == child.id){
                          child.tree$Selected = true;
                          // k.tree$Selected = true;
                        }
                      }
                    })
                  }
                })
              })
            }
          }

          // localStorage.setItem('menuItems', JSON.stringify(this.items));

        })
      )

      this.subscriptions.push(
        this.linerItems$.subscribe(items => {
          items?.map(x => {
            var element = document.getElementById('main-menu-' + x.id)
            if (x.tree$Expanded) {
              element?.classList.add('expanded')
            } else {
              element?.classList.remove('expanded')
            }
            if (x.tree$Active) {
              element?.classList.add('active')
            } else {
              element?.classList.remove('active')
            }
          });
        })
      )

    })

  }

  onSearchChange(e: string) {
    this.searchStream$.next(e)
  }

  clearSearch(): void {
    this.searchFor = "";
    this.searchStream$.next("");
  }

  validateNavigationItem(item: INavigatorItem) {
    if (!!!item.id) {
      this.itemsErrors.push(`Value of property "id" of navigation item "${item.code}" is not set`);
    }
    const filter = this.flatNavigationCheck.filter(x => x.id === item.id);
    if (filter.length === 0) {
      this.flatNavigationCheck.push({
        id: item.id,
        count: 0,
      });
    } else {
      this.itemsErrors.push(`Duplicated Navigation id ${item.id}`);
    };

    if (this.hasChildren(item)) {
      item.tree$Children?.map(child => {
        this.validateNavigationItem(child);
      })
    }

  }

  hasChildren(item: INavigatorItem): boolean {
    let result = false;
    Object.keys(item).forEach(key => {
      if (key === "tree$Children") {
        if (!!item['tree$Children']?.length) {
          result = true;
        }
      }
    });
    return result;
  }

  itemHasChildren(item: INavigatorItem): boolean {
    let result: boolean = false;
    Object.keys(item).forEach(key => {
      if (key === 'tree$Children') {
        if (!!item['tree$Children']?.length) {
          result = true;
          return;
        }
      };
    });
    return result;
  }

  onItemClick(item: INavigatorItem) {
    const current = this.linerItems$.value;
    const items = this.navigatorService.seftToggleExpandSiblingsCollapse(current, item.id);
    this.linerItems$.next(items);
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => {
      if (x) x.unsubscribe();
    })
  }

}