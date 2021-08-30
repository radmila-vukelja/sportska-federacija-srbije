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
import { ListPlayersComponent } from './components/user-role-components/list-players/list-players.component';
import { EditClubComponent } from './components/edit-club/edit-club.component';
import { AllClubsComponent } from './components/all-clubs/all-clubs.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
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
  { path: 'user-all-club-players', component: ListPlayersComponent },
  { path: 'user-all-club-players/:id', component: ListPlayersComponent },
  { path: 'edit-club', component: EditClubComponent },
  { path: 'edit-club/:id', component: EditClubComponent },
  { path: 'all-clubs', component: AllClubsComponent },
  { path: 'edit-player', component: EditPlayerComponent },
  { path: 'edit-player/:id', component: EditPlayerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
