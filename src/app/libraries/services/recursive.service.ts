import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { liner_to_nested_array_script } from 'src/assets/js/rescusive_wk';

export interface IEveryTreeStatus {
  selectedKey: string | undefined;
  activeKeys: string[];
  checkedKeys?: string[];
  expandedKeys: string[];
  checkInheritance?: boolean;
}

export interface IRecursiveServiceItem {
  tree$Key: string;
  tree$Title: string;
  tree$Parent: string;
  tree$Children: IRecursiveServiceItem[];
  tree$Tier: number;
  tree$Path: string;
  tree$HasChildren: boolean;
  tree$HasActiveChildren: boolean;
  tree$HasGrandchildren: boolean;
  tree$Expanded?: boolean;
  tree$Active?: boolean;
  tree$Highlighted?: boolean;
  tree$InheritantActive?: boolean;
  tree$Checked?: boolean;
  tree$Selected?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RecursiveService {

  /*
    list: input array of liner items
    keyField: name of the field that will be used as node key (id, key, code,...)
    titleField: name of the field that will be used as node title (title, caption, text,...)
    parentField: name of the field that holds parent value (parent, parentId,...)
  */

  linerArrayToNestedArray(
    list: any[],
    keyField: string,
    titleField: string,
    parentField: string,
    activeField: string = 'active',
    checkedField: string = 'checked',
    expandedField: string = 'expanded',
    status: IEveryTreeStatus | null = null,
    orderBy: string = titleField,
  ): Observable<any> {

    /* 
      Input list will be refactored and returned as function output.
      We need to make a shallow copy of input list for indexing until done,
      (but items refferences stay the same),
      because during loops items of list might be moved somewhere else
    */
    const listOriginalCopy = [...list];
    let maxTier = 0;


    return new Observable<any>(observer => {
      /* 
        A try to bypass cases of possible overwriting 
        With the prefix "tree$" I hope that the probability is low enough
      */
      list.map(item => {

        item.tree$Key = item[keyField];
        item.tree$Title = item[titleField];
        item.tree$Parent = item[parentField];
        item.tree$Children = [];

        //extras
        item.tree$Tier = 1;
        item.tree$Path = '.' + item.tree$Key;
        item.tree$HasChildren = false;
        item.tree$HasActiveChildren = false;
        item.tree$HasGrandchildren = false;
        item.tree$Highlighted = false;
        item.tree$Selected = false;

        if (!!!status) {
          item.tree$Expanded = item[expandedField!];
          item.tree$Active = item[activeField!];
          item.tree$Checked = item[checkedField!];
        } else {
          item.tree$Expanded = status.expandedKeys.includes(item.tree$Key.toString());
          item.tree$Active = status.activeKeys.includes(item.tree$Key.toString());
          item.tree$Checked = status.checkedKeys?.includes(item.tree$Key.toString());
        }
      })

      const rawList = JSON.parse(JSON.stringify(list));

      /*
        The Algorithm:
  
        @Recursive function "loop":
        - It takes one argument as current parent, which we need to add children to
        - The children are selected from the liner input list with filter() method
        - After being added, the children will be removed from the liner list with splice() method
        @The recursive function "loop" calls itself:
        - While mapping its tree$Children
        - This time each item of the children will have role of current parent, and so on
        @ The first calls:
        - Mapping the liner input array and call the loop with each of the items
      */

      const sortFn = (a: any, b: any) => {
        if (a[orderBy] > b[orderBy]) return 1;
        if (a[orderBy] === b[orderBy]) return 0;
        if (a[orderBy] < b[orderBy]) return -1;
        return 0;
      }


      const loop = (currentParent: any) => {
        const key = currentParent.tree$Key;

        // select children for currentParent 
        const children = list.filter(c => c.tree$Parent === key);

        if (!!children.length) {
          currentParent.tree$HasChildren = true;
          // also update liner item
          const filter = rawList.filter((x: any) => x.tree$Key === key)
          if (!!filter.length) {
            filter[0].tree$HasChildren = true;
          }

          // update grandpa if any
          const grandparents = listOriginalCopy.filter(x => x.tree$Key === currentParent.tree$Parent);
          if (!!grandparents.length) grandparents[0].tree$HasGrandchildren = true;
        }

        // select children for currentParent 
        const activeChildren = children.filter((c: any) => !!c.isActive);
        if (!!activeChildren.length) {
          currentParent.tree$HasActiveChildren = true;
        }

        let i = children.length;

        if (i > 0) {
          while (i--) {
            if (i < children.length) {
              const child = children[i];
              currentParent.tree$Children.push(child);
              const index = list.indexOf(child);
              if (index > -1) list.splice(index, 1);
            }
          }
        }

        i = currentParent.tree$Children.length;
        if (i > 0) {
          while (i--) {
            if (i < currentParent.tree$Children.length) {
              const child = currentParent.tree$Children[i];
              loop(child);
            }
          }
        }

      }

      // NEW CHANGE ON Sep 3rd 2023
      const loopUpdateTierAndPath = (currentParent: any) => {
        const tier = currentParent.tree$Tier;
        const path = currentParent.tree$Path;

        const children = currentParent.tree$Children
        children.map((child: any) => {
          child.tree$Tier = tier + 1;
          if (maxTier < tier + 1) maxTier = tier + 1;

          child.tree$Path = path + "." + child.tree$Key;

          loopUpdateTierAndPath(child);

        })

      }

      try {

        var i = list.length;
        if (i > 0) {
          while (i--) {
            if (i < list.length) {
              const item = list[i];
              loop(item);
            }
          }
        }

        list.map((item: any) => {
          loopUpdateTierAndPath(item);
        })

      } catch (error) {

        console.error(error)

        observer.error(error)
      }

      list.reverse()

      observer.next({
        rawList,
        list,
        maxTier
      });

    })

  }

  /*
  * TO DO
  */
  nestedArrayToLinerArray(
    list: any[],
    keyField: string,
    titleField: string,
    parentField: string
  ): Promise<any[]> {
    return new Promise((resolve, reject) => {
    })

  }

  /* 
    The type of the input item must inherit IRecursiveServiceItem.
    Otherwise the function does not work!
  */
  nestedResetActive(item: any, valueToBeSet: boolean): Promise<number[]> {

    const toggledIds: number[] = [];

    const loop = (i: any) => {
      i.tree$Active = valueToBeSet;
      toggledIds.push(i.id);
      const children = i.tree$Children;
      if (!!children && !!children.length) {
        children.map((child: any) => loop(child));
      }
    }

    return new Promise((resolve, reject) => {
      try {
        loop(item);
        resolve(toggledIds)
      } catch (e) {
        reject(e)
      }
    })
  }

  nestedToggleCheck(item: any, valueToBeSet: boolean): Promise<number[]> {

    const toggledIds: number[] = [];

    const loop = (i: any) => {
      i.tree$Checked = valueToBeSet;
      toggledIds.push(i.id);
      const children = i.tree$Children;
      if (!!children && !!children.length) {
        children.map((child: any) => loop(child));
      }
    }

    return new Promise((resolve, reject) => {
      try {
        loop(item);
        resolve(toggledIds)
      } catch (e) {
        reject(e)
      }
    })
  }

  findItem(search: string, treeData: IRecursiveServiceItem[]): Observable<string[]> {

    const findingReset = () => {

      const findingResetLoop = (currentData: IRecursiveServiceItem) => {
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

    const findLoop = (currentData: IRecursiveServiceItem): void => {
      if (currentData.tree$Title.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
        foundPaths.push(currentData.tree$Path)
        foundTitles.push(currentData.tree$Title)
      }
      currentData.tree$Children.map(child => {
        findLoop(child)
      })

    }

    const resolveFoundLoop = (currentData: IRecursiveServiceItem, path: string): void => {

      currentData.tree$Expanded = true;

      if (currentData.tree$Path === path) {
        currentData.tree$Highlighted = true;
      }
      if (path.indexOf(currentData.tree$Path) >= 0) {
        currentData.tree$Children.filter(c => path.indexOf(c.tree$Path) >= 0).map(child => {
          resolveFoundLoop(child, path);
        })
      }
    }

    return new Observable<string[]>(observer => {

      try {

        treeData?.map(currentBlock => {
          findLoop(currentBlock);
        })

        foundPaths.map(path => {
          treeData.filter(block => path.indexOf(block.tree$Path) >= 0).map(currentBlock => {
            resolveFoundLoop(currentBlock, path);
          })
        })

        observer.next(foundTitles)

      } catch (e) {
        observer.error(e);
      }

    })

  }

  initialize(status: IEveryTreeStatus, data: any): void {

  }

  findItemObjectByKey(key: string, treeData: IRecursiveServiceItem[]): IRecursiveServiceItem | null {

    let result: IRecursiveServiceItem | null = null;

    const loopFindItemObject = (currentItem: IRecursiveServiceItem) => {
      if (currentItem.tree$Key.toString() === key) {
        result = currentItem;
      } else {
        if (!!currentItem.tree$Children) {
          currentItem.tree$Children.map(child => {
            loopFindItemObject(child);
          })
        }
      }
    }

    treeData?.map(block => {
      loopFindItemObject(block);
    })

    return result;
  }

  loopExpandParent(currentParentKey: string, treeData: IRecursiveServiceItem[]): void {
    const currentParent = this.findItemObjectByKey(currentParentKey, treeData);
    if (!!currentParent) {
      currentParent.tree$Expanded = true;
      if (!!currentParent.tree$Parent) {
        this.loopExpandParent(currentParent.tree$Parent.toString(), treeData);
      }
    }
  }

  writeValueChecked(checkedKeys: string[], treeData: IRecursiveServiceItem[], disabledLoopExpand: boolean = false): Observable<void> {

    const loopCheck = (currentItem: IRecursiveServiceItem) => {
      currentItem.tree$Expanded = false;
      const checked = checkedKeys.includes(currentItem.tree$Key.toString());
      if (!!checked) {
        currentItem.tree$Checked = true;
      } else {
        currentItem.tree$Checked = false;
      }
      currentItem.tree$Children.map(child => loopCheck(child))
    }

    return new Observable<void>(observer => {

      treeData?.map(block => {
        loopCheck(block);
      });

      checkedKeys.map(key => {
        const item = this.findItemObjectByKey(key, treeData);
        if (!!item && !!item?.tree$Parent) {
          if (!!!disabledLoopExpand) this.loopExpandParent(item.tree$Parent.toString(), treeData);
        }
      });

      observer.next();
    })

  }

  writeValueActivated(activatedKeys: string[], treeData: IRecursiveServiceItem[], disabledLoopExpand: boolean = false): Observable<void> {

    const loopActive = (currentItem: IRecursiveServiceItem) => {
      currentItem.tree$Expanded = false;
      const activated = activatedKeys.includes(currentItem.tree$Key);
      if (!!activated) {
        currentItem.tree$Active = true;
      } else {
        currentItem.tree$Active = false;
      }
      currentItem.tree$Children.map(child => loopActive(child))
    }

    return new Observable<void>(observer => {

      treeData?.map(block => {
        loopActive(block);
      });

      activatedKeys.map(key => {
        const item = this.findItemObjectByKey(key, treeData);
        if (!!item && !!item?.tree$Parent) {
          if (!!!disabledLoopExpand) this.loopExpandParent(item.tree$Parent.toString(), treeData);
        }
      });

      observer.next();

    })

  }

  buildTreeData(cloneCopy: any[]): Promise<any[]> {

    return new Promise<any[]>((resolve, reject) => {
      let nestedItems: any[] = [];

      if (typeof Worker !== 'undefined') {
        // Create a new

        console.log("🟢🟢 Worker works");

        const worker = new Worker(liner_to_nested_array_script);
        worker.addEventListener('message', ({ data }) => {
          nestedItems = data.list;
          if (!!nestedItems && !!nestedItems?.length) nestedItems[0].tree$Expanded = true;
          resolve(nestedItems);
        });

        worker.postMessage({
          list: cloneCopy,
          keyField: 'id',
          titleField: 'name',
          parentField: 'parentId',
          activeField: 'active',
          //inheritantActiveField: 'inheritantActive',
          checkedField: 'checked',
          expandedField: 'expand',
        });
      } else {
        console.error("🟢🟢 Worker not available");
        reject("🟢🟢 Worker not available")
      }
    })

  }

}