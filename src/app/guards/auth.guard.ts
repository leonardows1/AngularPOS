import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { UserDTO } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // const token = this.tokenService.getToken();
    // if (!token) {
    //   this.router.navigate(['/home']);
    //   return false;
    // }
    // return true;
    // **************************************
    return this.authService.getProfile()
    .pipe(
      map(user => {
        if(!user) {
          console.log('Ningun usuario logueado');
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    )
    // ****************************************

  }

}
