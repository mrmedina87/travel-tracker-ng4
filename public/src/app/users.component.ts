import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  constructor (
      private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
  }
  userList = ['user1', 'user2'];
}
