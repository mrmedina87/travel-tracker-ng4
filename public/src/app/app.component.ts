import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';

import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor (
     private localStorageService: LocalStorageService,
     private router: Router
  ) { }

  ngOnInit() {
    let token = this.localStorageService.get("token");
    if(!token) {
      this.router.navigate(['/login'], /*{
        queryParams: {
          redirectAfterLogin: "Pito"
        }
      }*/);
    }
  }
  
  title = 'app';
}