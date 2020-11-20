import { TokenAuthenticationService } from 'src/app/core/services/token-authentication.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
    constructor(private _tokenAuthenticationService: TokenAuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const authToken = this._tokenAuthenticationService.token;
        if (!authToken) {
            return next.handle(request);
        }

        const authRequest = request.clone({ setHeaders: { Authorization: authToken } });
        return next.handle(authRequest);
    }
}