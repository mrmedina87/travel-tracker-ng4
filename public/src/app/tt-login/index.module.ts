import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocalStorageModule } from 'angular-2-local-storage';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './components/login.component';

import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})

export class LoginModule { }
