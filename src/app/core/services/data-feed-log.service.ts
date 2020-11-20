import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DataFeedLogService {

    baseUrl: string = environment.baseUrl + 'DataFeedLog/';

    constructor(private _http: HttpClient) { }

    getDataFeedLog(pageSize: number, pageNumber: number, dataFeedTypeId: string): Observable<any> {
        return this._http.get(this.baseUrl + 'DataFeedLog?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&dataFeedTypeId=' + dataFeedTypeId);
    }
}

