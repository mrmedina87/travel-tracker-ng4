import { Injectable } from '@angular/core';
import { Headers, Http }       from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';

import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';   

import { User }  from './../../models/user';

@Injectable()
export class LoginService {

  
  private loggedIn = new Subject<boolean>();

  followIsLoggedIn() {
    return this.loggedIn.asObservable();
  }

  setIsLoggedIn() {
    this.loggedIn.next(!!this.localStorageService.get('token'));
  }

  constructor(private http: Http, private localStorageService: LocalStorageService) {
    this.setIsLoggedIn();
  }

  private url = 'http://localhost:8080/api/login';

  private headers = new Headers({'Content-Type': 'application/json'});

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  login(email: string, password: string): Promise<any> {
    return this.http
      .post(this.url, {
         userName: email,
         password: password
        }, {
         headers: this.headers
        })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
}