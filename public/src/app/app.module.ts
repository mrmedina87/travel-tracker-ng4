import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocalStorageModule } from 'angular-2-local-storage';
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UsersComponent } from './users.component';
import { LoginComponent } from './login.component';

import { AuthGuard } from './auth.guard';
import { LoginService } from './login.service';

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
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AuthGuard,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
