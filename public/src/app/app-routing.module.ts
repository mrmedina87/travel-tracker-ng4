import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { UsersComponent }   from './users.component';
import { LoginComponent }      from './login.component';
 
const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'users',  component: UsersComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'heroes',     component: HeroesComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}