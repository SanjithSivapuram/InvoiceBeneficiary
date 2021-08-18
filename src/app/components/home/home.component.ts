import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: any = window.sessionStorage.getItem('username');
  constructor() { }

  ngOnInit(): void {
  }

  onLogout() {
    if (this.username !== null) {
      this.username = null;
      window.sessionStorage.removeItem("username");
      window.sessionStorage.removeItem('isLoggedIn');
    }
  }

}
