import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated() {
    let username: String = window.sessionStorage.getItem('username');
    let loggedIn: String = window.sessionStorage.getItem('isLoggedIn');
    if (loggedIn == 'true') {
      return true;
    }
    return false;
  }
}
