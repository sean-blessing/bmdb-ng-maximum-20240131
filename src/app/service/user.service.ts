import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { UserLogin } from '../model/user-login';

const URL: string = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(userLogin: UserLogin): Observable<User> {
    return this.http.post(URL + '/login', userLogin) as Observable<User>;
  }

}
