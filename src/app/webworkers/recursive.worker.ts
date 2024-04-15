/*
import { IOrgTreeItem } from "../libraries/core-org-tree/core-org-tree/IOrgTreeItem";

const workercode = () => {

  self.onmessage = function (e: any) {
    // eslint-disable-line no-restricted-globals

    const { data } = e;

    const list: IOrgTreeItem[] = data.list;
    const keyField: string = data.keyField;
    const titleField: string = data.titleField;
    const parentField: string = data.parentField;
    const activeField: string = data.activeField || 'active';
    const inheritantActiveField: string = data.inheritantActiveField || 'inheritantActive';
    const checkedField: string = data.checkedField || 'checked';
    const expandedField: string = data.expandedField || 'expanded';

    const listOriginalCopy = [...list];

    list.map((item: any) => {
      item.tree$Key = item[keyField];
      item.tree$Title = item[titleField];
      item.tree$Parent = item[parentField];
      item.tree$Children = [];

      //extras
      item.tree$Tier = 1;
      item.tree$Path = '.' + item.tree$Key;
      item.tree$HasChildren = false;
      item.tree$HasGrandchildren = false;
      item.tree$Expanded = item[expandedField!];
      item.tree$Active = item[activeField!];
      item.tree$Highlighted = false;
      item.tree$InheritantActive = item[inheritantActiveField!];
      item.tree$Checked = item[checkedField!];
      item.tree$Selected = false;
    })

    const loop = (currentParent: any) => {
      const key = currentParent.tree$Key;
      const tier = currentParent.tree$Tier;
      const path = currentParent.tree$Path;

      // select children for currentParent 
      const children = list.filter((c: any) => c.tree$Parent === key);

      if (!!children.length) {
        currentParent.tree$HasChildren = true;

        // update grandpa if any
        const grandparents = listOriginalCopy.filter(x => x.tree$Key === currentParent.tree$Parent);
        if (!!grandparents.length) grandparents[0].tree$HasGrandchildren = true;
      }

      children.map((child: any) => {
        child.tree$Tier = tier + 1;
        child.tree$Path = path + '.' + child.tree$Key;
        currentParent.tree$Children.push(child);
        const index = list.indexOf(child);
        if (index > -1) {
          console.log("REMOVE CHILD")
          console.log("list.length before splice", list.length)
          list.splice(index, 1);
          console.log("list.length after splice", list.length)
        }
      })

      currentParent.tree$Children.map((child: any) => {
        loop(child);
      })

    }

    try {
      list.map((item: any) => {
        loop(item);
      })
    } catch (error) {
      postMessage([]);
    }

    postMessage(list);

  }
}

let code = workercode.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

const blob = new Blob([code], { type: 'application/javascript' });
export const liner_to_nested_array_script = URL.createObjectURL(blob);

*/