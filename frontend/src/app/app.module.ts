import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

/** Dialog component */
import { DialogComponent } from './components/shared/dialog/dialog.component';

/** Import services */
import { GuardService } from './service/guard.service';
import { LoginService } from './service/login.service';

/** Angular material imports  */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

/** Regular components  */
import { HeaderComponent } from './components/shared/header/header.component';
import { RegisterComponent } from './components/auth-components/register/register.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LoginComponent } from './components/auth-components/login/login.component';
import { AddSportComponent } from './components/add-sport/add-sport.component';
import { HomeComponent } from './components/shared/home/home.component';
import { ChangePasswordComponent } from './components/auth-components/change-password/change-password.component';
import { ResetPasswordComponent } from './components/auth-components/reset-password/reset-password.component';
import { AddClubComponent } from './components/add-club/add-club.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AddPlayerToAClubComponent } from './components/add-player-to-a-club/add-player-to-a-club.component';
import { SeeAllClubMembersComponent } from './components/see-all-club-members/see-all-club-members.component';
import { DeleteDialogComponent } from './components/shared/delete-dialog/delete-dialog.component';
import { AllClubsUserComponent } from './components/user-role-components/all-clubs-user/all-clubs-user.component';
import { AllClubsComponent } from './components/all-clubs/all-clubs.component';
import { ListPlayersComponent } from './components/user-role-components/list-players/list-players.component';
import { EditClubComponent } from './components/edit-club/edit-club.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    RegisterComponent,
    DialogComponent,
    LocationsComponent,
    LoginComponent,
    AddSportComponent,
    HomeComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    AddClubComponent,
    AdminPageComponent,
    AddPlayerToAClubComponent,
    SeeAllClubMembersComponent,
    DeleteDialogComponent,
    AllClubsUserComponent,
    AllClubsComponent,
    ListPlayersComponent,
    EditClubComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    CdkTreeModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [
    GuardService,
    LoginService,
    HttpClient,
    DialogComponent,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
