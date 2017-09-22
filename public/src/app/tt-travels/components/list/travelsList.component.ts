import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { TravelService } from './../../services/travel.service';

@Component({
  selector: 'travels',
  templateUrl: './travelsList.component.html',
  styleUrls: ['./travelsList.component.css']
})

export class TravelsListComponent implements OnInit {
  constructor (
    private travelService: TravelService,
    private localStorageService: LocalStorageService,
    private router: Router,
    public toastr: ToastsManager,
  ) { }

  travelsList: any[];

  delete(id) {
    if(id) {
      this.travelService.delete(id).then(resp => {
         this.toastr.success('Travel deleted', '');
         this.updateList();
      }).catch(err => {
        this.toastr.warning('Problems while trying to delete this travel - check your internet connection', 'Warning');
      });
    }
  }

  updateList() {
    this.travelService.queryAll().then(resp => {
      this.travelsList = resp;
    }).catch(err => {
      this.toastr.warning('Problems while trying to update this view - check your internet connection', 'Warning');
    })
  }

  ngOnInit() {
    if(this.localStorageService.get('admin')) {
      this.router.navigate(['/users']);
    }
    this.updateList();
  }
}
