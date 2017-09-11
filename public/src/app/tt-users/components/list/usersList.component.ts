import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';

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
      private router: Router
  ) { }

  usersList: User[];

  delete(name) {
    if(name) {
      this.userService.delete(name).then(resp => {
        this.updateList();
      }).catch(err => {
        console.log(err);
      });
    }
  }

  updateList() {
    this.userService.queryAll().then(resp => {
      this.usersList = resp;
    }).catch(err => {
      console.log(err);
    })
  }

  ngOnInit() {
    if(!this.localStorageService.get('admin')) {
      this.router.navigate(['/travels']);
    }
    this.updateList();
  }
}
