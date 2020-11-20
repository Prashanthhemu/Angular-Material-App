import { Injectable } from '@angular/core';
import { AuthenticateRequest } from '../models/authenticate-request';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'


@Injectable()
export class LoginService {

    baseMethod: string = environment.baseUrl + 'Account/';
    constructor(private _http: HttpClient) { }

    getUserAuthenticationDetails(authenticateRequest: AuthenticateRequest): Observable<any> {
        return this._http.post(this.baseMethod + 'Authenticate', authenticateRequest);
    }
}