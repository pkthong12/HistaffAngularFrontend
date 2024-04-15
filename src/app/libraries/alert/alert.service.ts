import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAlert, EnumAlertType, IAlertOptions } from './alert/alert.model'

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    alerts$ = new BehaviorSubject<IAlert[]>([]);

    // convenience methods
    success(message: string, options?: IAlertOptions) {
        if (!message) return;
        const id = new Date().getTime().toString();
        this.alert({ ...options, type: EnumAlertType.Success, message, id } as IAlert);
    }

    error(message: string, options?: IAlertOptions) {
        if (!message) return;
        const id = new Date().getTime().toString();
        this.alert({ ...options, type: EnumAlertType.Error, message, id } as IAlert);
    }

    info(message: string, options?: IAlertOptions) {
        if (!message) return;
        const id = new Date().getTime().toString();
        this.alert({ ...options, type: EnumAlertType.Info, message, id } as IAlert);
    }

    warn(message: string, options?: IAlertOptions) {
        if (!message) return;
        const id = new Date().getTime().toString();
        this.alert({ ...options, type: EnumAlertType.Warning, message, id } as IAlert);
    }

    // main alert method    
    alert(alert: IAlert) {
        alert.id = alert.id
        this.alerts$.next([...this.alerts$.value, alert])
    }

    // clear alerts
    clear(id: string) {
        this.alerts$.next(this.alerts$.value.filter(x => x.id !== id))
    }
}