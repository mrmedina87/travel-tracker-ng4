import { Injectable } from '@angular/core';
import { Headers, Http }       from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User }  from './../../models/user';

@Injectable()
export class LoginService {

  constructor(private http: Http) {}
  private url = 'http://localhost:8080/api/login';

  private headers = new Headers({'Content-Type': 'application/json'});

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  login(email: string, password: string): Promise<any> {
    console.log(email, password);
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