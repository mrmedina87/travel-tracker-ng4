import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { UsersComponent }   from './users.component';
import { LoginComponent }      from './login.component';
import { AppComponent }      from './app.component';

import { AuthGuard } from './auth.guard';
 
const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users',  component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}