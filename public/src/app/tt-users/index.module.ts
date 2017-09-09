import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocalStorageModule } from 'angular-2-local-storage';
import { FormsModule } from '@angular/forms';


import { UsersListComponent } from './components/list/usersList.component';

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
  ]
})

export class UsersModule { }
