import { BehaviorSubject } from 'rxjs';

export class CoreOrgTreeState {

  coreOrgTreeReduced$ = new BehaviorSubject<boolean>(false);

  constructor() { }
}
