import { UpdateUserModel } from './../models/update-user-model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { CreateUserModel } from '../models/create-user-model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class UserManagementService {

    baseUrl: string = environment.baseUrl + 'Account/';


    constructor(private _http: HttpClient) { }

    getUsers(pageSize: number, pageNumber: number): Observable<any> {
        return this._http.get(this.baseUrl + 'User?pageSize=' + pageSize + '&pageNumber=' + pageNumber);
    }

    createUser(userFormData: CreateUserModel): Observable<any> {
        return this._http.post(this.baseUrl + 'User', JSON.stringify(userFormData), httpOptions);
    }

    updateUserDetails(id: string, updateUserFormData: UpdateUserModel): Observable<any> {
        return this._http.put(this.baseUrl + 'User/' + id, JSON.stringify(updateUserFormData), httpOptions);
    }

    deleteUserDetails(id: string): Observable<any> {
        return this._http.delete(this.baseUrl + 'User/' + id);
    }
}