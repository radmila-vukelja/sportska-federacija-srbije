import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../../../service/login.service';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  email: string;
  oldPassword;
  newPassword: string;
  repeatPassword: string;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private loginService: LoginService
  ) { }


  ngOnInit(): void {
  }


  openDialog(text: string, height: string, width: string, action: boolean) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: width,
      height: height,
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
      if (action) {
        this.router.navigate(['login']);
      }
    });
  }

  changePassword() {
    if (!this.email && this.email.length < 5) {
      return this.openDialog('Email adresa mora biti duza od 5 karaktera. ', '450px', '300px', false);
    }

    if (!this.oldPassword && this.oldPassword.length < 5) {
      return this.openDialog('Stara sifra mora biti duza od 5 karaktera. ', '450px', '300px', false);
    }

    if (!this.newPassword && this.newPassword.length < 5) {
      return this.openDialog('Nova sifra mora biti duza od 5 karaktera. ', '450px', '300px', false);
    }

    if (!this.repeatPassword && this.repeatPassword.length < 5 && this.newPassword !== this.repeatPassword) {
      return this.openDialog('Sifre se moraju podudarati! ', '450px', '300px', false);
    }
    
    this.loginService.changePassword(this.email, this.newPassword, this.oldPassword).subscribe(
      data => {
        return this.openDialog('Uspesno ste promenili sifru! ', '450px', '300px', true);
      },
      error => {
        return this.openDialog('Desila se greska prilikom promene vase sifre! \n Proverite da li su svi podaci tacni.', '450px', '300px', false);
      }
    )
  }


}
