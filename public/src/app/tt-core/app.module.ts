import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { LocalStorageModule } from 'angular-2-local-storage';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './../tt-routing/index.module';
import { UsersModule } from './../tt-users/index.module';
import { LoginModule } from './../tt-login/index.module';

import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [
    BrowserModule,
    LocalStorageModule.withConfig({
      prefix: 'auth-tt',
      storageType: 'localStorage'
    }),
    FormsModule,
    HttpModule,
    AppRoutingModule,
    UsersModule,
    LoginModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
