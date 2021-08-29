import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSportComponent } from './components/add-sport/add-sport.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/shared/home/home.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add-sport', component: AddSportComponent },
  { path: 'change-password', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
