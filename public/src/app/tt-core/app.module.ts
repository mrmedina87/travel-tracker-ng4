import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocalStorageModule } from 'angular-2-local-storage';
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app.component';

import { AppRoutingModule } from './../tt-routing/index.module';
import { UsersModule } from './../tt-users/index.module';
import { LoginModule } from './../tt-login/index.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LocalStorageModule.withConfig({
      prefix: 'auth-tt',
      storageType: 'localStorage'
    }),
    AppRoutingModule,
    FormsModule,
    HttpModule,
    LoginModule,
    UsersModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
