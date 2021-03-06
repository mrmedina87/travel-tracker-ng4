import { Injectable } from '@angular/core';
import { Headers, Http }       from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';

import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';   

import { User }  from './../../models/user';

@Injectable()
export class UserService {

  constructor(
    private http: Http, 
    private localStorageService: LocalStorageService) {
  }

  private url = 'http://localhost:8090/api/users';

  private headers = new Headers({
    'Authorization': this.localStorageService.get('token')
  });

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  queryAll(): Promise<any> {
    let urlQueryAll = this.url + '/' + this.localStorageService.get('useremail');
    return this.http.get(urlQueryAll, {
         headers: this.headers
        })
      .toPromise()
      .then(response => {
        return response.json().usersList as User[]
      })
      .catch(this.handleError);
  }

  delete(name): Promise<any> {
    let urlDelete = this.url + '/' + name;
    return this.http.delete(urlDelete, {
         headers: this.headers
        })
      .toPromise()
      .then(response => {
        return response
      })
      .catch(this.handleError);
  }
}