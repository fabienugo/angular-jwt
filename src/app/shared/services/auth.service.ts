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
   * Permet à un utilisateur de s'inscrire
   * @param user le user qui s'inscrit
   */
  signup(user: User): Observable<User> {
    return this.http.post<User>('/api/login_check', user);
  }

  /**
   * Permet à un utilisateur de se connecter
   * @param credentials le login/mot de passe
   */
  signin(credentials: { email: string, password: string }): Observable<string> {
    return this.http.post<string>('http://localhost:8000/api/login_check', credentials).pipe(
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

  /**
   * Permet de se déconnecter et de supprimer le token
   */
  logout() {
    localStorage.removeItem('jwt');
  }
}
