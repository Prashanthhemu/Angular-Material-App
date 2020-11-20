import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TokenAuthenticationService {
    token: string;
    tokenChange = new Subject<string>();
    constructor() {
        this.tokenChange.subscribe((value) => {
            this.token = value
        });
    }

    toggleTokenChange(updateToken: string) {
        this.tokenChange.next(updateToken);
    }
}