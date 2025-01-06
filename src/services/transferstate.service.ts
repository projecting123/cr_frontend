import { inject, Injectable, makeStateKey, StateKey } from '@angular/core';
import { TransferState } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TransferStateService {
    private readonly ts = inject(TransferState);
    readonly authUserInfoKey = makeStateKey('userInfo');
    getUser(keyName: StateKey<any>){
        return this.ts.get(keyName, null);
    }

    setUser(keyName: StateKey<any>, value: any){
        this.ts.set(keyName, value);
    }
}