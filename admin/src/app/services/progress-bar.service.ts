import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProgressBarService {
    private _visible: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() {
    }

    get visible(): Observable<any>
    {
        return this._visible.asObservable();
    }

    show(): void
    {
        this._visible.next(true);
    }

    hide(): void
    {
        this._visible.next(false);
    }
}
