import { Injectable } from '@angular/core';
import { Headers, Http }       from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';

import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';   

import { User }  from './../../models/user';

// TODO: subscribe to localStorageService observables in order to get messages from changes of certain variables on the #f$%@ng localstorage: https://www.npmjs.com/package/angular-2-local-storage

@Injectable()
export class LoginService {

  constructor(
    private http: Http, 
    private localStorageService: LocalStorageService
  ) {
    this.updateIsLoggedIn();
  }
  
  private loggedIn = new Subject<boolean>();

  private url = 'http://localhost:8090/api/login';

  private headers = new Headers({'Content-Type': 'application/json'});

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  public followIsLoggedIn() {
    return this.loggedIn.asObservable();
  }

  public updateIsLoggedIn() {
    this.loggedIn.next(!!this.localStorageService.get('token'));
  }

  public logout() {
    localStorage.removeItem('auth-tt.token');
    localStorage.removeItem('auth-tt.useremail');
    localStorage.removeItem('auth-tt.admin');
    this.updateIsLoggedIn();
  }

  public login(email: string, password: string): Promise<any> {
    return this.http
      .post(this.url, {
         userName: email,
         password: password
        }, {
         headers: this.headers
        })
      .toPromise()
      .then(response => {
        this.updateIsLoggedIn();
        return response.json()
      })
      .catch(this.handleError);
  }
}