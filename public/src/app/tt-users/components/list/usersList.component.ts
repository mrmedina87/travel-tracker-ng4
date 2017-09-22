import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { UserService } from './../../services/user.service';

import { User } from './../../../models/user';

@Component({
  selector: 'users',
  templateUrl: './usersList.component.html',
  styleUrls: ['./usersList.component.css']
})

export class UsersListComponent implements OnInit {
  constructor (
      private userService: UserService,
      private localStorageService: LocalStorageService,
      private router: Router,
      public toastr: ToastsManager,
  ) { }

  usersList: User[];

  delete(name) {
    if(name) {
      this.userService.delete(name).then(resp => {
        this.toastr.success('User deleted', '');
        this.updateList();
      }).catch(err => {
        this.toastr.warning('Problems while trying to delete this user - check your internet connection', 'Warning');
      });
    }
  }

  updateList() {
    this.userService.queryAll().then(resp => {
      this.usersList = resp;
    }).catch(err => {
      this.toastr.warning('Problems while trying to update this view - check your internet connection', 'Warning');
    });
  }

  ngOnInit() {
    if(!this.localStorageService.get('admin')) {
      this.router.navigate(['/travels']);
    }
    this.updateList();
  }
}
