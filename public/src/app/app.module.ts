import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocalStorageModule } from 'angular-2-local-storage';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UsersComponent } from './users.component';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    LocalStorageModule.withConfig({
      prefix: 'auth-tt',
      storageType: 'localStorage'
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
