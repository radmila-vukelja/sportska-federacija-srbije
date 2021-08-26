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

  getAllUsers() {
    return this.http.get<User[]>(this.apiUrl + 'user/all-users', { headers: this.getHeaders() });
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

  setRoleToLocalStorage(role) {
    localStorage.setItem('role', role);
  }

  getRoleFromLocalStorage() {
    return localStorage.getItem('role');
  }

  register(user: User) {
    return this.http.post(this.apiUrl + 'user/registration', user)
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
    this.router.navigate(['home'])
  }

}
