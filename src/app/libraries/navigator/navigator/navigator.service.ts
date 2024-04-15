import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { INavigatorItem } from './INavigatorItem';
import { MultiLanguageService } from 'src/app/services/multi-language.service';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {

  clickedItem$ = new BehaviorSubject<INavigatorItem | null>(null);

  constructor(
    private router: Router,
    private mls: MultiLanguageService,
    ) {
  }

  itemHasChildren(item: INavigatorItem): boolean {
    let result: boolean = false;
    Object.keys(item).forEach(key => {
      if (key === 'children') {
        if (!!item['tree$Children']!.length) {
          result = true;
          return;
        }
      };
    });
    return result;
  }

  setParentIdForMockupItem(item: INavigatorItem) {
    if (this.itemHasChildren(item)) {
      item.tree$Children!.map(child => {
        child.parent = item.id;
        child.path = `${item.path}=>${child.id}`;
        child.level = item.level! + 1;
        this.setParentIdForMockupItem(child);
      })
    }
  }

  seftToggleExpandSiblingsCollapse(items: INavigatorItem[], currentId: number): INavigatorItem[] {

    const loopExpand = (child: INavigatorItem) => {
      const filter = items.filter(x => x.id === child.parent)
      if (!!filter.length) {
        const parent = filter[0];
        parent.tree$Expanded = true;
        loopExpand(parent);
      }
    }

    items.map(x => x.tree$Active = false);
    const filter = items.filter(x => x.id === currentId);

    if (!!filter.length) {
      const currentItem = filter[0];

      //if (!!currentItem.expanded) {
        let siblings;
        if (!!currentItem.parent) {
          siblings = items.filter(x => x.parent === currentItem.parent && x.id !== currentId)
        } else {
          siblings = items.filter(x => !!!x.parent && x.id !== currentId)
        }
        siblings.map(x => x.tree$Expanded = false);
      //}

      currentItem.tree$Expanded = !!!currentItem.tree$Expanded;
      loopExpand(currentItem);

      currentItem.tree$Active = true;

      if (currentItem.url) {
        this.router.navigateByUrl(currentItem.url)
      }
    }
    return items
  }

  findItem(search: string, treeData: INavigatorItem[]): Observable<string[]> {

    const findingReset = () => {

      const findingResetLoop = (currentData: INavigatorItem) => {
        currentData.tree$Highlighted = false
        currentData.tree$Expanded = false
        currentData.tree$Children.map(child => {
          findingResetLoop(child)
        })
      }

      treeData?.map(block => findingResetLoop(block))

    }

    findingReset();

    if (search === "" || !!!search) {
      return new Observable(r => r.next([]))
    }

    let foundPaths: string[] = [];
    let foundTitles: string[] = [];

    const findLoop = (currentData: INavigatorItem): void => {
      const translatedText = this.mls.trans(currentData.code);
      if (translatedText.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
        foundPaths.push(currentData.tree$Path!)
        foundTitles.push(translatedText)
      }
      currentData.tree$Children.map(child => {
        findLoop(child)
      })

    }

    const resolveFoundLoop = (currentData: INavigatorItem, path: string): void => {

      currentData.tree$Expanded = true;

      if (currentData.tree$Path === path) {
        currentData.tree$Highlighted = true;
      }
      if (path.indexOf(currentData.tree$Path!) >= 0) {
        currentData.tree$Children.filter(c => path.indexOf(c.tree$Path!) >= 0).map(child => {
          resolveFoundLoop(child, path);
        })
      }
    }

    return new Observable<string[]>(observer => {

      try {

        treeData.map(currentBlock => {
          findLoop(currentBlock);
        })

        foundPaths.map(path => {
          treeData.filter(block => path.indexOf(block.tree$Path!) >= 0).map(currentBlock => {
            resolveFoundLoop(currentBlock, path);
          })
        })

        observer.next(foundTitles)

      } catch (e) {
        observer.error(e);
      }

    })

  }

}