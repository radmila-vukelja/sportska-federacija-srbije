import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { User } from '../../model/user';
import { ValidatorService } from '../../service/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userName: string;
  password: string;
  email: string;
  name: string;
  lastName: string;
  repeatPassword: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    public dialog: MatDialog,
    private validationService: ValidatorService
  ) { }

  ngOnInit(): void {
  }

  register() {
    if (
      this.validationService.validateUsername(this.userName, 5) &&
      this.validationService.validateRegularField(this.name, 2, 'Ime') &&
      this.validationService.validateRegularField(this.lastName, 6, 'Prezime') &&
      this.validationService.validateEmail(this.email, 6) &&
      this.validationService.validatePasswordAndRepeatPassword(this.password, this.repeatPassword, 5)
    ) {
      this.registration();
    }
  }

  registration() {
    let user = new User();
    user.name = this.name;
    user.userName = this.userName;
    user.lastName = this.lastName;
    user.password = this.password;
    user.email = this.email;

    this.loginService.register(user).subscribe(
      data => {
        this.openDialog('Registracija je uspesna! \n Molimo Vas da proverite Vas email i potvrdite nalog. ', '350px', '300px', true);
      },
      error => {
        this.openDialog('Desila se greska prilikom registracije. Pokusajte ponovo.', '350px', '300px', false);
      }
    );
  }

  openDialog(text: string, height: string, width: string, action: boolean) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: width,
      height: height,
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['login']);
    });
  }

}
