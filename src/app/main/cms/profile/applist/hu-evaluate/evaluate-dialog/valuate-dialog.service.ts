import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, filter, of } from "rxjs";
import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
export interface IDialogConfirmModel {
    instanceNumber: number;
    confirmed: boolean;
}
@Injectable({
    providedIn: 'root'
})

export class EvaluateDialogService {
    busy!: boolean;

    showConfirmDialog$ = new BehaviorSubject<boolean | undefined>(undefined);
    canDeactivate$ = new Subject<boolean>;
    dialogConfirmed$ = new BehaviorSubject<IDialogConfirmModel | undefined>(undefined);

    title$ = new BehaviorSubject<EnumTranslateKey>(EnumTranslateKey.UI_COMMON_EMPTY_STRING);
    body$ = new BehaviorSubject<EnumTranslateKey>(EnumTranslateKey.UI_COMMON_EMPTY_STRING);
    okButtonText$ = new BehaviorSubject<EnumTranslateKey>(EnumTranslateKey.UI_COMMON_EMPTY_STRING);
    cancelButtonText$ = new BehaviorSubject<EnumTranslateKey>(EnumTranslateKey.UI_COMMON_EMPTY_STRING);
    showCancelOnly$ = new BehaviorSubject<boolean>(false);
    informationLines$ = new BehaviorSubject<string[]>([]);
    reason$ = new BehaviorSubject<string>('');
    showingUp$ = new BehaviorSubject<boolean>(false);
    shownBtn$ = new BehaviorSubject<boolean>(false);
    shownInput$ = new BehaviorSubject<boolean>(false);
    dateInput$ = new BehaviorSubject<Date>(new Date());

    formType: number = 1;
    dialogStateOpen$ = new BehaviorSubject<boolean | undefined>(undefined);

    constructor() {
        this.dialogConfirmed$.pipe(
            filter(x => !!x?.confirmed)
        ).subscribe(_ => this.resetService())
    }

    /**
     * Ask user to confirm an action. `message` explains the action and choices.
     * Returns observable resolving to `true`=confirm or `false`=cancel
     */
    confirm(message?: EnumTranslateKey): Observable<boolean> {
        const confirmation = window.confirm(message || 'Is it OK?');
        return of(confirmation);
    }

    resetService(): void {
        this.busy = false;
        this.dialogConfirmed$.next(undefined)
        this.title$.next(EnumTranslateKey.UI_COMMON_EMPTY_STRING)
        this.body$.next(EnumTranslateKey.UI_COMMON_EMPTY_STRING)
        this.okButtonText$.next(EnumTranslateKey.UI_COMMON_EMPTY_STRING)
        this.cancelButtonText$.next(EnumTranslateKey.UI_COMMON_EMPTY_STRING)
        this.showCancelOnly$.next(false)
        this.informationLines$.next([])
        this.showingUp$.next(false)
        this.shownBtn$.next(false)
        this.shownInput$.next(false)
    }

    alert(message: string): void {
        window.alert(message);
    }

    createNew(
        title: EnumTranslateKey = EnumTranslateKey.UI_CORE_DIALOG_SERVICE_CONFIRMATION,
        okButtonText: EnumTranslateKey = EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CONFIRM,
        cancelButtonText: EnumTranslateKey = EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CANCEL,
        showCancelOnly: boolean = false,
        body: EnumTranslateKey,
        informationLines: any[] = [],
        shownBtn: boolean = false,
        shownInput: boolean = false
    ): void {
        this.title$.next(title);
        this.okButtonText$.next(okButtonText);
        this.cancelButtonText$.next(cancelButtonText);
        this.showCancelOnly$.next(showCancelOnly);
        this.body$.next(body);
        this.informationLines$.next(informationLines);
        this.busy = true;
        this.showConfirmDialog$.next(true);
        this.shownBtn$.next(shownBtn);
        this.shownInput$.next(shownInput)
    }
}