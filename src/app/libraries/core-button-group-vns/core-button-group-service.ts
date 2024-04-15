import { Injectable } from '@angular/core';
import { EnumCoreButtonVNSCode } from './core-button-group-vns/EnumCoreButtonVNSCode';
import { BehaviorSubject } from 'rxjs';

export interface ICoreButtonGroupStatus {
    instanceNumber: number;
    mustBeHidden$: BehaviorSubject<EnumCoreButtonVNSCode[]>;
}

@Injectable({
    providedIn: 'root',
})
export class CoreButtonGroupService {

    instances: ICoreButtonGroupStatus[] = [];

}