import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'users',
  templateUrl: './usersList.component.html',
  styleUrls: ['./usersList.component.css']
})

export class UsersListComponent implements OnInit {
  constructor (
      private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
  }
  userList = ['user1', 'user2'];
}
