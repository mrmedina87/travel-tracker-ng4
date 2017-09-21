import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from "./../../models/user";

import { LoginService } from './../services/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor (
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) { }

  model = new User('', '');

  serverMsj = '';

  login() {
    const userEmail = this.model.email;
    let routeTo: String;
    this.loginService.login(this.model.email, this.model.password).then(respJson => {
        if(respJson.successMsg) {
          this.serverMsj = respJson.successMsg;
          this.localStorageService.set('token', respJson.token);
          this.localStorageService.set('useremail', userEmail);
          if(respJson.admin) {
            this.localStorageService.set('admin', 'true');
            routeTo = '/users';
            // this.router.navigate([this.returnUrl]);
            // TO DO REDIRECTING CLEVER IN THE FUTURE
          }
          else {
            this.localStorageService.set('admin', '');
            routeTo = '/travels';
          }
          this.loginService.updateIsLoggedIn();
          this.router.navigate([routeTo]);
        }
      }).catch(err => {
        this.serverMsj = err.json().msg;
      });
  }

  returnUrl: string;
  
  ngOnInit() {
    if(this.localStorageService.get('token')) {
      this.router.navigate(['/']);
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  loginPlaceholder = "loginPage";
}
