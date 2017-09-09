import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { UsersListComponent }   from './../tt-users/components/list/usersList.component';
import { LoginComponent }      from './../tt-login/components/login.component';

import { AuthGuard } from './guards/auth.guard';
 
const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users',  component: UsersListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule {}