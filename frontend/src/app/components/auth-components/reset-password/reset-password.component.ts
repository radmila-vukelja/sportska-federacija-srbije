import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../../../service/login.service';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  email: string;

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
    });
  }

  resetPassword(){
    if(this.email && this.email.length > 5){
      this.loginService.resetPassword(this.email).subscribe(
        data =>{ 
          return this.openDialog('Uspesno ste resetovali sifru. Proverite vas email. ', '350px', '300px', false);
        },
        error =>{
          return this.openDialog('Desila se greska prilikom resetovanja sifre. ', '350px', '300px', false);
        }
      )
    }else {
      return this.openDialog('Proverite da li ste pravilno uneli email adresu. ', '350px', '300px', false);
    }
  }

}
