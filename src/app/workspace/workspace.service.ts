import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

export class PageAction {
    hidden?: boolean;
}

export type PageActions = PageAction[];

export class ButtonPageAction extends PageAction {
    constructor(public text: string, public click: () => void, public props?: { icon?: string, nzType?: string ,  disabled?: boolean | (() => boolean)}) {
        super();
    }
}

@Injectable({
    providedIn: 'root'
})
export class WorkspaceService {
    private _pageActionsSubject = new BehaviorSubject<PageActions | undefined>(undefined);
    readonly pageActionsChange = this._pageActionsSubject.asObservable();

    setPageActions(pageAction?: PageActions | undefined) {
        this._pageActionsSubject.next(pageAction);
    }
}
