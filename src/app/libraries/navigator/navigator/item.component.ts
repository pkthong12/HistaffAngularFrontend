import { Component, ElementRef, Input, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NavigatorService } from './navigator.service';
import { MultiLanguageService } from 'src/app/services/multi-language.service';
import { LayoutService } from 'src/app/services/layout.service';
import { INavigatorItem } from './INavigatorItem';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemComponent implements OnInit, OnDestroy {

  @Input() item!: INavigatorItem;
  @Input() level!: number;
  @ViewChild('me') me!: ElementRef;
  @ViewChild('children') children!: ElementRef;
  @ViewChild('link') link!: ElementRef;
  @ViewChild('subArrow') subArrow!: ElementRef;

  caption!: string;

  hasChildren: boolean = false;
  mainWindowState!: string;
  expanded: boolean = false;
  leftbarReduced!: boolean;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private navigatorService: NavigatorService,
    private mls: MultiLanguageService,
    private layoutService: LayoutService,
    private menuService: MenuService,
  ) { }

  ngOnInit() {
    if (this.item) {
      // const filter = Object.keys(this.item).filter(key => key === "tree$Children");
      // console.log(filter)
      if (this.item.tree$Children.length > 0) {
        this.hasChildren = true;
      }
    }

    this.subscriptions.push(
      this.mls.lang$.subscribe(_ => {
        this.caption = this.mls.trans(this.item.code)
      })
    )

    this.subscriptions.push(
      this.layoutService.leftbarReduced$.subscribe(x => this.leftbarReduced = x)
    )
  }

  subArrowClicked(event: Event) {

    event.stopPropagation();

    if (this.children.nativeElement.className === 'child sub-menu') {
      this.children.nativeElement.className = 'child sub-menu expanded';
      this.subArrow.nativeElement.className = this.subArrow.nativeElement.className.replace(' plus', '') + ' minus';
    } else if (this.children.nativeElement.className === 'child sub-menu expanded') {
      this.children.nativeElement.className = 'child sub-menu';
      this.subArrow.nativeElement.className = this.subArrow.nativeElement.className.replace(' minus', '') + ' plus';
    }
  }

  onClick(event: any, item: INavigatorItem) {
    if(this.item.tree$Selected == true && !!this.item.tree$Parent && (this.item.tree$Tier != 2 || this.item.tree$Tier == 2 && this.item.tree$Children.length == 0)){
      return
    }
    event.preventDefault();
    event.stopImmediatePropagation();

    if (this.children) {
      const el = this.children.nativeElement;
      const rect = el.getBoundingClientRect();
      const height = rect.height;
      if (height === 0) { 
        item.tree$Selected = true;
      } 
      else {
        if(item.tree$Tier == 1 ||item.tree$Tier == 2){
          item.tree$Selected = false;
        }
      }
      this.me.nativeElement.style.setProperty('--children-height', height + 'px')
    } else {
      item.tree$Selected = true;
      this.menuService.navigation$.value.map(x => {
        if(x.tree$Children){
          x.tree$Children.map((y : any) => {
            if(y.tree$Children){
              y.tree$Children.map((z : any) => {
                if(z != item){
                  z.tree$Selected = false
                }
              })
            }else if (y != item){
              y.tree$Selected = false;
            }
          })
        }
      })
      // arrayItems.map(x => {
      //   item.tree$Selected = true;
      //   if(x != item){
      //     x.tree$Selected = false;
      //   }
      // })
      

    }
    this.navigatorService.clickedItem$.next(item)
    if(!!item.tree$Parent){
      localStorage.setItem('menuCurrentClicked', JSON.stringify(item));
    }
  }

  onModuleIconClick(event: any, item: INavigatorItem) {
    event.stopPropagation();
    console.log("onModuleIconClick event", event)
    this.layoutService.leftbarReduced$.next(false);
    document.documentElement.style.setProperty('--size-left-bar-current-width', '280px');
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x.unsubscribe())
  }

}
