import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { UsersListComponent }   from './../tt-users/components/list/usersList.component';
import { TravelsListComponent }   from './../tt-travels/components/list/travelsList.component';
import { LoginComponent }      from './../tt-login/components/login.component';

import { AuthGuard } from './guards/auth.guard';
 
const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'users',  
    component: UsersListComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'travels',  
    component: TravelsListComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: '', 
    redirectTo: '/users', 
    pathMatch: 'full' 
  }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule {}