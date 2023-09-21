import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Observable, map, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.getProfile()
      .pipe(
        map(user => {
          if (user) {
            if(user?.rol.name === 'Administrador') {
              return true;
            } else {
              console.log('Sin permisos de administrador');
              this.router.navigate(['/home']);
              return false;
            }
          }else{
            return false;
          }
        })
      )
  }

}
