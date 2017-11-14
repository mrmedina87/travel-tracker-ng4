import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocalStorageModule } from 'angular-2-local-storage';
import { FormsModule } from '@angular/forms';

import { TravelsListComponent } from './components/list/travelsList.component';
import { TravelFormComponent } from './components/form/travelForm.component';

@NgModule({
  declarations: [
    TravelsListComponent,
    TravelFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    TravelsListComponent
  ],
  entryComponents: [
    TravelFormComponent
  ],
})

export class TravelsModule { }
