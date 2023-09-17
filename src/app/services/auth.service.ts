import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Auth } from '../models/auth.model';
import { Login } from '../models/login.model';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = `${environment.API_URL}auth`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(login: Login) {
    console.log(`${this.apiUrl}/login`, login);
    return this.http.post<Auth>(`${this.apiUrl}/login`, login)
    .pipe(
      tap(response => this.tokenService.saveToken(response.accessToken))
    );
  }

  profile(token: string){
    return this.http.get(`${this.apiUrl}/profile`)
  }

  getRols(){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.tokenService.getToken()}`);
    return this.http.get(`${environment.API_URL}rol`,{
      headers : headers
    })
  }
}
