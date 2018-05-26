import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {appConfig} from '../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {TokenStorage} from '../core/token.storage';

import { User } from '../register/users.model';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private token: TokenStorage) {
  }

  attemptAuth(userid: string, password: string): Observable<any> {
    const credentials = {userId: userid, password: password};
    return this.http.post<any>(appConfig.apiUrl + '/user/login', credentials);
  }
  
  attemptRegister(user: User): Observable<any> {
    //const registration = {name: userName, email: email, password: password}; 
    console.log(user);
    return this.http.post<any>(appConfig.apiUrl + '/user/register', user);
    }
    
  signOut() {
        // remove user from local storage to log user out
        this.token.signOut();
    }
}