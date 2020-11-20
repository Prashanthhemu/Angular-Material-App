import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DataFeedTypeService {

    baseUrl: string = environment.baseUrl + 'DataFeedType/';

    constructor(private _http: HttpClient) { }

    getDataFeedType(): Observable<any> {
        return this._http.get(this.baseUrl + 'DataFeedType');
    }
}

