import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from "./user";

import { LoginService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})

export class LoginComponent implements OnInit {
  constructor (
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) { }

  model = new User('', '');

  submitted = false;

  serverMsj = '';

  onSubmit() { this.submitted = true; }

  login() {
    this.loginService.login(this.model.email, this.model.password).then(respJson => {
        if(respJson.successMsg) {
          this.serverMsj = respJson.successMsg;
          this.localStorageService.set('token', respJson.successMsg);
          this.router.navigate([this.returnUrl]);
        }
      }).catch(err => {
        this.serverMsj = err.json().msg;
      });
  }

  returnUrl: string;
  
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  loginPlaceholder = "loginPage";
}
