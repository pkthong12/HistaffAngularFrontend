import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IUserActivity {
  type: string,
  user: string,
  avatar: string,
  message: string,
  data: IUserActivityData
}

export interface IUserActivityData {
  group?: string,
  sid: string,
  username: string,
  pathname: string,
  avatar: string,
  hubConnectionId: string,
  accessTime: number,
  userActivity?: IUserActivityData[],
}

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {

  userActivity$ = new BehaviorSubject<IUserActivityData[]>([]);

  constructor() { }

  mergeActivities(incomingData: IUserActivityData[]) {

    const currentData = this.userActivity$.value as IUserActivityData[];

    const result = [] as IUserActivityData[]

    const addItemToResult = (item: IUserActivityData) => {
      const resultFilter = result.filter(element => element.sid === item.sid)
      if (resultFilter.length) {
        const index = result.indexOf(resultFilter[0]);
        if (index !== -1) {
          result.splice(index, 1);
        }
      }
      result.push(item)
    }

    incomingData.map((item1: IUserActivityData) => {
      const filter = currentData.filter((item2: IUserActivityData) => item2.sid === item1.sid)
      if (filter.length) {
        if (item1.accessTime > filter[0].accessTime) {
          addItemToResult(item1)
        } else {
          addItemToResult(filter[0])
        }
      } else {
        addItemToResult(item1)
      }
    })

    currentData.map((item2: IUserActivityData) => {
      const filter = incomingData.filter(item1 => item1.sid === item2.sid)
      if (filter.length) {
        if (item2.accessTime > filter[0].accessTime) {
          addItemToResult(item2)
        } else {
          addItemToResult(filter[0])
        }
      } else {
        addItemToResult(item2)
      }
    })

    return result
  }
}
