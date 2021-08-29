import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { SportType } from '../model/sport-type';

@Injectable({
  providedIn: 'root'
})
export class SportTypeService {

  apiUrl = 'http://localhost:8080/sport-type';

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  getOne(id: number) {
    return this.http.get<SportType>(this.apiUrl + '/' + id, { headers: this.loginService.getHeaders() })
  }

  getAll() {
    return this.http.get<SportType[]>(this.apiUrl + '/all', { headers: this.loginService.getHeaders() })
  }

  edit(sportType: SportType) {
    return this.http.put<SportType>(this.apiUrl, sportType, { headers: this.loginService.getHeaders() });
  }

  save(sportType: SportType) {
    return this.http.post<SportType>(this.apiUrl, sportType, { headers: this.loginService.getHeaders() })
  }

  findByCategoryId(id){
    return this.http.get<SportType>(this.apiUrl + '/find-by-category-id/'+id, { headers: this.loginService.getHeaders() })
  }

}
