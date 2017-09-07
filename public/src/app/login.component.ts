import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor (
      private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.localStorageService.set("token", "asda");
  }
  loginPlaceholder = "loginPage";
}
