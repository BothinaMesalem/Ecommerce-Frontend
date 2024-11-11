import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account, LoginResponse } from '../models/account';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private Apiurl = "https://localhost:7100/api/Account/Login";
  private tokenKey = 'authToken';
  private UserIdKey = 'userId';

  constructor(private httpclient: HttpClient) { }

  login(account: Account): Observable<LoginResponse> {
    return this.httpclient.post<LoginResponse>(this.Apiurl, account).pipe(
      tap((response: LoginResponse) => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          
          const payload = JSON.parse(atob(response.token.split('.')[1]));
          const userId = payload.id || null;  

          if (userId) {
            localStorage.setItem(this.UserIdKey, userId);
          } else {
            console.log("Can't get id");
          }
        }
      }),
      catchError((error) => {
        const errorMessage = error?.error?.message || 'An unknown error occurred';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); 
      return payload.role || null; 
    }
    return null;
  }

  getUserId(): string | null {
    return localStorage.getItem(this.UserIdKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.UserIdKey);
  }
}
