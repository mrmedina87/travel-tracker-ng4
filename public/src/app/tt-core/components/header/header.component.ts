import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { LoginService } from './../../../tt-login/services/login.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'tt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  loggedIn: any;
  subscription: Subscription;

  constructor (
      private localStorageService: LocalStorageService,
      private loginService: LoginService
  ) { 
    this.subscription = this.loginService.followIsLoggedIn().subscribe(message => { 
      this.loggedIn = message; 
    });
    this.loginService.setIsLoggedIn(!!localStorage.getItem('auth-tt.token'));
  }

  ngOnInit() {
  }

  logout() {
    // this.localStorageService.set('token','');
    localStorage.removeItem('auth-tt.token');
  }
}
