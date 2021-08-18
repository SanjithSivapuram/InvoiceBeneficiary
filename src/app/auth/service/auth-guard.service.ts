import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  status: Boolean;
  constructor(private authService: AuthService, private route: Router) { }

  canActivate(): Boolean {
    this.status = this.authService.isAuthenticated();
    if (this.status == false) {
      this.route.navigateByUrl('/login')
    }
    return true;
  }
}
