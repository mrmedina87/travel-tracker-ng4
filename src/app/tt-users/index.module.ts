import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocalStorageModule } from 'angular-2-local-storage';
import { FormsModule } from '@angular/forms';

import { UsersListComponent } from './components/list/usersList.component';
import { UserFormComponent } from './components/form/userForm.component';

@NgModule({
  declarations: [
    UsersListComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    UsersListComponent
  ],
  entryComponents: [
    UserFormComponent
  ],
})

export class UsersModule { }
