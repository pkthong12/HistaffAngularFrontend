import { Injectable } from '@angular/core';
import { IOrgTreeItem } from '../libraries/core-org-tree/core-org-tree/IOrgTreeItem';
import { BehaviorSubject } from 'rxjs';
import { IEveryTreeStatus } from '../libraries/services/recursive.service';
import { liner_to_nested_array_script } from 'src/assets/js/rescusive_wk';
import { RecursiveService } from '../libraries/services/recursive.service';

export interface ICoreOrgTreeInstance {
  instanceNumber: number;
  selectedKey$: BehaviorSubject<string | undefined>;
  activeKeys$: BehaviorSubject<string[]>;
  checkedKeys$: BehaviorSubject<string[]>;
  expandedKeys$: BehaviorSubject<string[]>;
  checkInheritance$: BehaviorSubject<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  instances: ICoreOrgTreeInstance[] = [];

  loading: boolean = true;
  orgTreeData$ = new BehaviorSubject<IOrgTreeItem[]>([])
  orgTreeDataWithPositions$ = new BehaviorSubject<IOrgTreeItem[]>([])
  linerData$ = new BehaviorSubject<IOrgTreeItem[]>([])

  status$ = new BehaviorSubject<IEveryTreeStatus>({
    selectedKey: undefined,
    activeKeys: [],
    checkedKeys: [],
    expandedKeys: [],
    checkInheritance: true
  });

  constructor(
    private recursiveService: RecursiveService
  ) { }

  buildTreeData(status: IEveryTreeStatus = {
    selectedKey: undefined,
    activeKeys: [],
    checkedKeys: [],
    expandedKeys: [],
    checkInheritance: true
  }): void {
    this.loading = true;

    const cloneCopy = JSON.parse(JSON.stringify(this.linerData$.value));

    if (typeof Worker !== 'undefined') {
      // Create a new

      console.log("🟢🟢 Worker works");

      const worker = new Worker(liner_to_nested_array_script);
      worker.addEventListener('message', ({ data }) => {
        const newData = data.list;
        this.orgTreeData$.next(newData);
        this.loading = false;
      });

      worker.postMessage({
        list: cloneCopy,
        keyField: 'id',
        titleField: 'name',
        parentField: 'parentId',
        activeField: 'active',
        checkedField: 'checked',
        expandedField: 'expand',
        status
      });
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
        this.recursiveService
          .linerArrayToNestedArray(
            cloneCopy,
            'id',
            'name',
            'parentId',
            'active',
            'checked',
            'expand',
            status
          )
          .subscribe((obj) => {
            const newData = obj.list;
            this.orgTreeData$.next(newData);
            this.loading = false;
          })
    }
  }

}
