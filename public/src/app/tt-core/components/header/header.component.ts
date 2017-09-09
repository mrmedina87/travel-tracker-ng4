import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
      private router: Router,
      private loginService: LoginService
  ) { 
    this.subscription = this.loginService.followIsLoggedIn().subscribe(message => { 
      this.loggedIn = message; 
    });
    this.loginService.setIsLoggedIn();
  }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('auth-tt.token');
    this.loginService.setIsLoggedIn();
    this.router.navigate(['/login']);
  }
}
