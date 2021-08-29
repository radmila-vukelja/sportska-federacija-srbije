import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClubComponent } from './components/add-club/add-club.component';
import { AddPlayerToAClubComponent } from './components/add-player-to-a-club/add-player-to-a-club.component';
import { AddSportComponent } from './components/add-sport/add-sport.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { ChangePasswordComponent } from './components/auth-components/change-password/change-password.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LoginComponent } from './components/auth-components/login/login.component';
import { RegisterComponent } from './components/auth-components/register/register.component';
import { ResetPasswordComponent } from './components/auth-components/reset-password/reset-password.component';
import { HomeComponent } from './components/shared/home/home.component';
import { SeeAllClubMembersComponent } from './components/see-all-club-members/see-all-club-members.component';
import { AllClubsUserComponent } from './components/user-role-components/all-clubs-user/all-clubs-user.component';

const routes: Routes = [
  
  { path: '', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add-sport', component: AddSportComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'add-club', component: AddClubComponent },
  { path: 'admin-page', component: AdminPageComponent },
  { path: 'add-player', component: AddPlayerToAClubComponent },
  { path: 'add-player/:id', component: AddPlayerToAClubComponent },
  { path: 'all-club-players', component: SeeAllClubMembersComponent },
  { path: 'all-club-players/:id', component: SeeAllClubMembersComponent },
  { path: 'user-all-clubs', component: AllClubsUserComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
