import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  path: string = 'http://localhost:9999';

  constructor(private httpClient: HttpClient) { }

  public postUser(user: User): Observable<any> {
    let authcode = btoa(user.username + ":" + user.password);
    user.username = authcode;
    user.password = "";
    return this.httpClient.post<any>(this.path + '/sign-up', user);
  }

  loginUser(user: User): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(user.username + ":" + user.password)
      })
    }
    return this.httpClient.get<any>(this.path + '/login', httpOptions);
  }

}
