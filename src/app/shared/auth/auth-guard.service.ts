import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( private router: Router,private authService: AuthService) {}

  canActivate() : boolean{
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/pages/login']);
      return false;
    }
    return true
  }
}
