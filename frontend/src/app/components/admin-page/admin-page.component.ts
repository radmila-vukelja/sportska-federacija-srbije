import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { LoginService } from 'src/app/service/login.service';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'userName', 'name', 'lastName', 'email', 'emailIsConfirmed', 'userIsBanned', 'delete'];
  dataSource = new MatTableDataSource<User>();

  constructor(
    private loginService: LoginService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.loginService.user)
    if (!this.loginService.isUserLoggedIn()) {
      //this.router.navigate(['login']);
    }
    this.getAllUsers();
  }

  banUser(id) {
    this.loginService.banUser(id).subscribe(
      data => {
        return this.openDialog('Korisniku je zabranjen pristup. ', '450px', '400px', true);
      },
      error => {
        return this.openDialog('Desila se greska prilikom banovanja korisnika. ', '450px', '300px', false);
      }
    )
  }

  unBanUser(id) {
    this.loginService.unBanUser(id).subscribe(
      data => {
        return this.openDialog('Korisniku je opet dozvoljen pristup. ', '450px', '400px', true);
      },
      error => {
        return this.openDialog('Desila se greska.', '450px', '300px', false);
      }
    )
  }

  getAllUsers() {
    this.loginService.getAllUsers().subscribe(
      data => {
        console.log(data);
        this.removeAdminsFromUserList(data);
      },
      error => {
        console.error("ERROR: ", error)
      }
    )
  }

  removeAdminsFromUserList(data) {
    let userList: User[] = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].role.type !== "ROLE_ADMIN") {
        userList.push(data[i]);
      }
    }
    this.setNewDataSource(userList);
  }

  setNewDataSource(data) {
    this.dataSource.data = data;
  }

  openDialog(text: string, height: string, width: string, action: boolean) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: width,
      height: height,
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
      if (action) {
        this.router.navigate(['home']);
      }
    });
  }

}
