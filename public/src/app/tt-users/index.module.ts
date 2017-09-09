import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocalStorageModule } from 'angular-2-local-storage';
import { FormsModule } from '@angular/forms';


import { UsersListComponent } from './components/list/usersList.component';


// import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    UsersListComponent
  ]/*,
  providers: [
    LoginService
  ]*/
})

export class UsersModule { }
