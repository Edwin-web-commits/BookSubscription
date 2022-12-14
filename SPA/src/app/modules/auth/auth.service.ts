import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from './IAuth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: IUser = {
    username: null,
    email: null,
    isSubscriber: false,
    isLoggedIn:false
  };
  helper = new JwtHelperService();
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient,private router:Router) {}

  login(model): Observable<IUser> {
    return this.http.post(this.baseUrl + 'api/accounts/login', model).pipe(
      map((response: any) => {
        localStorage.setItem('token', response.token);
        const decodedToken = this.helper.decodeToken(response.token);
        this.currentUser.username = decodedToken.given_name;
        this.currentUser.email = decodedToken.email;
        this.currentUser.isLoggedIn = true;
        console.log(decodedToken);
        if (decodedToken.isSubscriber == 'True') {
          this.currentUser.isSubscriber = true;
        }
        this.router.navigate(['/home']);
        return this.currentUser;
      })
    );
  }

  logout() {
    this.currentUser.username = null;
    this.currentUser.email = null;
    this.currentUser.isSubscriber = false;
    this.currentUser.isLoggedIn = false;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
