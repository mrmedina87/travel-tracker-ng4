import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';

import { TravelService } from './../../services/travel.service';

// import { User } from './../../../models/user';

@Component({
  selector: 'travels',
  templateUrl: './travelsList.component.html',
  styleUrls: ['./travelsList.component.css']
})

export class TravelsListComponent implements OnInit {
  constructor (
    private travelService: TravelService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  travelsList: any[];

  delete(id) {
    if(id) {
      this.travelService.delete(id).then(resp => {
         this.updateList();
      }).catch(err => {
        console.log(err);
      });
    }
  }

  updateList() {
    this.travelService.queryAll().then(resp => {
      this.travelsList = resp;
    }).catch(err => {
      console.log(err);
    })
  }

  ngOnInit() {
    if(this.localStorageService.get('admin')) {
      this.router.navigate(['/users']);
    }
    this.updateList();
  }
}
