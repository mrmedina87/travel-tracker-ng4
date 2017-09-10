import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocalStorageModule } from 'angular-2-local-storage';
import { FormsModule } from '@angular/forms';


import { TravelsListComponent } from './components/list/travelsList.component';

@NgModule({
  declarations: [
    TravelsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    TravelsListComponent
  ]
})

export class TravelsModule { }
