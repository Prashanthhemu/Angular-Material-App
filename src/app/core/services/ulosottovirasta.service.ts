import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UlosottovirastoModel } from "../models/ulosottovirasto-model";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class UlosottovirstaService {
    baseUrl: string = environment.baseUrl + 'Ulosottovirasto/';

    constructor(private _http: HttpClient) { }

    getUlosottovirsta(dataFeedId: string): Observable<any> {
        return this._http.get(this.baseUrl + 'Ulosottovirasto/' + dataFeedId);
    }

    getUlosottovirstaDetails(ulosottovirastoId: string): Observable<any> {
        return this._http.get(this.baseUrl + 'UlosottovirastoDetails?UlosottovirasId=' + ulosottovirastoId);
    }

    createUlosottovirasto(ulosottovirastoModel: UlosottovirastoModel): Observable<any> {
        return this._http.post(this.baseUrl + 'Ulosottovirasto', JSON.stringify(ulosottovirastoModel), httpOptions);
    }
}