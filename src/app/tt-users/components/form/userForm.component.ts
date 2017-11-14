import { Component } from '@angular/core';
// import { LocalStorageService } from 'angular-2-local-storage';
// import { Router } from '@angular/router';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// import { UserService } from './../../services/user.service';

import { User } from './../../../models/user';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

interface ConfirmModel {
  title:string;
  message:string;
}

@Component({
  selector: 'users',
  templateUrl: './userForm.component.html',
  styleUrls: ['./userForm.component.css']
})

export class UserFormComponent 
  extends DialogComponent<ConfirmModel, boolean> 
  implements ConfirmModel {
  title: string;
  message: string;
  constructor(
    dialogService: DialogService
  ) {
    super(dialogService);
  }

  model = new User('', '');

  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    console.log(this.model);
    console.log('pasamos por aqui efectivamente!');
    this.result = true;
    this.close();
  }
}