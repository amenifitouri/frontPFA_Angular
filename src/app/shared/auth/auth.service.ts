import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt";

import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class AuthService {
  token: string;
  

  constructor(private http: HttpClient) {
  
  }

  login(username: string, password: string) {
    return this.http.post<any>(`/api/api/authenticate`, { username, password })
        .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.id_token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', user.id_token);
            localStorage.setItem('currentUser', JSON.stringify({username: username , token: user.id_token}));

           
          }
          return user;
        }));
  }

  signinUser(email: string, password: string) {
    //your code for checking credentials and getting tokens for for signing in user
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    
  }

  public isAuthenticated(): boolean {
    // const token = localStorage.getItem('token');
    // return !this.jwtHelper.isTokenExpired(token);
    return true;
  }
}
