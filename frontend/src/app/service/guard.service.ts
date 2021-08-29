import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private auth: LoginService, private router: Router) { }

  canActivate(): boolean {
    return true;
  }

}
