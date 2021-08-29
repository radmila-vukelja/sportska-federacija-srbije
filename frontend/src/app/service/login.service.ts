import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/shared/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user: User;
  private userIsLoggedIn = false;
  public headers;

  apiUrl = 'http://localhost:8080/';

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) { }

  resetPassword(email: string) {
    return this.http.get(this.apiUrl + 'user/reset-password/' + email);
  }

  changePassword(email, newPassword, oldPassword) {
    return this.http.get(this.apiUrl + 'user/change-password/' + email + '/' + newPassword + '/' + oldPassword);
  }

  getAllUsers() {
    return this.http.get<User[]>(this.apiUrl + 'user/all-users', { headers: this.getHeaders() });
  }

  banUser(id) {
    return this.http.get<User[]>(this.apiUrl + 'user/ban-user/' + id, { headers: this.getHeaders() });
  }

  unBanUser(id) {
    return this.http.get<User[]>(this.apiUrl + 'user/unban-user/' + id, { headers: this.getHeaders() });
  }

  getHeaders() {
    if (this.headers) {
      return this.headers;
    } else {
      let credentials = localStorage.getItem('credentials');
      if (credentials && credentials !== null) {
        const headers = new HttpHeaders({ authorization: 'Basic ' + credentials });
        this.headers = headers
        return this.headers;
      }
    }
  }

  login(korisnickoIme: string, sifra: string) {
    this.user = new User();
    const base64Kredencijali = btoa(korisnickoIme + ':' + sifra);
    localStorage.setItem('credentials', btoa(korisnickoIme + ':' + sifra));
    const headers = new HttpHeaders({ authorization: 'Basic ' + base64Kredencijali });
    return this.http.get<any>(this.apiUrl + 'auth/user', { headers: headers }).subscribe(data => {
      console.log(data);
      if (!data.emailIsConfirmed) {
        return this.openDialog('Morate da potvrdite vas nalog! Proverite email!', '350px', '300px', false);
      }
      if (data.userIsBanned) {
        return this.openDialog('Zabranjen vam je ulazak na sajt.', '350px', '300px', false);
      }
      this.user = data;
      localStorage.setItem('user', JSON.stringify(this.user));
      this.headers = headers;
      this.userIsLoggedIn = true;
      this.setRoleToLocalStorage(data.role);
      if (data.role === "ROLE_USER") {
        this.router.navigate(['user-all-clubs']);
      } else {
        this.router.navigate(['home']);
      }

    },
      error => {
        this.openDialog('Ne postoji korisnik sa tim kredencijalima', '350px', '300px', false);
      });
  }

  setRoleToLocalStorage(role) {
    localStorage.setItem('role', role);
  }

  getRoleFromLocalStorage() {
    return localStorage.getItem('role');
  }

  register(user: User) {
    return this.http.post(this.apiUrl + 'user/registration', user)
  }

  logout() {
    this.userIsLoggedIn = false;
    this.user = null;
    this.headers = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public isUserLoggedIn() {
    return this.getHeaders();
  }

  openDialog(text: string, height: string, width: string, action: boolean) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: width,
      height: height,
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  redirectHome() {
    if (this.getRoleFromLocalStorage() === "ROLE_ADMIN") {
      this.router.navigate(['home'])
    } else {
      this.router.navigate(['user-all-clubs'])
    }
  }

  addContestant() {
    this.router.navigate(['add-contestant'])
  }

  addNewClub() {
    this.router.navigate(['add-club'])
  }

}
