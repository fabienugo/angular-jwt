import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { JwtToken } from '../models/jwt-token.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Initialisation du behaviorSubject
  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject({
    isAuthenticated: null,
    token: null
  });

  constructor(
    private http: HttpClient
  ) { 
    this.initToken();
  }

  private initToken(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.jwtToken.next({
        isAuthenticated: true,
        // tslint:disable-next-line:object-literal-shorthand
        token: token
      });
    } else {
      this.jwtToken.next({
        isAuthenticated: false,
        token: null
      });
    }
  }

  /**
   * Permet à un utilisateur de s'inscrirew
   * @param user le user qui s'inscrit
   */
  signup(user: User): Observable<User> {
    return this.http.post<User>('/api/auth', user);
  }

  signin(credentials: { email: string, password: string }): Observable<string> {
    return this.http.post<string>('/api/auth/token', credentials).pipe(
      tap((token: string) => {
        this.jwtToken.next({
          isAuthenticated: true,
          // tslint:disable-next-line:object-literal-shorthand
          token: token
        });
        localStorage.setItem('jwt', token); // Stock notre token de manière persistente
      })
    );
  }
}
