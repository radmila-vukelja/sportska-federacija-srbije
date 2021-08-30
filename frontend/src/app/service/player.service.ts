import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { LoginService } from './login.service';
import { Player } from '../model/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  apiUrl = 'http://localhost:8080/player';

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  getOne(id: number) {
    return this.http.get<Player>(this.apiUrl + '/' + id, { headers: this.loginService.getHeaders() })
  }

  getAll() {
    return this.http.get<Player[]>(this.apiUrl + '/all', { headers: this.loginService.getHeaders() })
  }

  edit(player: Player){
    return this.http.put<Player>(this.apiUrl, player, { headers: this.loginService.getHeaders() });
  }

  save(player: Player) {
    return this.http.post<Category>(this.apiUrl, player, { headers: this.loginService.getHeaders() })
  }
}
