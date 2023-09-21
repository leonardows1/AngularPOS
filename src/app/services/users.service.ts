import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserDTO, UserDTO } from '../models/user.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private productsApiUrl = `${environment.API_URL}user/`;

  constructor(
    private http: HttpClient
  ) { }

  create(dto: CreateUserDTO){
    console.log(`${this.productsApiUrl}createUser`, dto)
    return this.http.post<UserDTO>(`${this.productsApiUrl}createUser`, dto);
  }

  getUsers(){
    return this.http.get<UserDTO[]>(this.productsApiUrl);
  }
}
