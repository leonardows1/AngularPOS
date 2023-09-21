import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Auth } from '../models/auth.model';
import { Login } from '../models/login.model';
import { switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { UserDTO } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = `${environment.API_URL}auth`;
  private user = new BehaviorSubject<UserDTO | null>(null);
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ){}

  login(login: Login) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, login)
    .pipe(
      tap(response => this.tokenService.saveToken(response.accessToken))
    );
  }

  loginAndGet(userName: string, password: string){
    return this.login({
      userNameOrEmail: userName,
      password: password
    }).pipe(
      switchMap(() => this.getProfile()),
    )
  }

  getProfile(){
    return this.http.get<UserDTO>(`${this.apiUrl}/profile`)
    .pipe(
      tap(user => {
        this.user.next(user);
      })
    );
  }

  logout(){
    this.tokenService.removeToken();
  }

  getRols(){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.tokenService.getToken()}`);
    return this.http.get(`${environment.API_URL}rol`,{
      headers : headers
    })
  }
}
