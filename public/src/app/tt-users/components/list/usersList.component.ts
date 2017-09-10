import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

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
      private localStorageService: LocalStorageService
  ) { }

  usersList: User[];

  ngOnInit() {
    this.userService.queryAll().then(resp => {
      this.usersList = resp;
    }).catch(err => {
      console.log(err);
    })
  }
}
