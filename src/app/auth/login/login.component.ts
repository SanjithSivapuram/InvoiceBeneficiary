import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private route: Router, private userService: UserService) {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  onLoginFormSubmit() {
    let user: User = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.userService.loginUser(user).subscribe(data => {
      window.sessionStorage.setItem("username", btoa(user.username + ':' + user.password));
      window.sessionStorage.setItem("isLoggedIn", "true");
      this.route.navigateByUrl("/");
    },
      (err: any) => {
        console.log(err);
        window.sessionStorage.removeItem("username");
        window.sessionStorage.removeItem("isLoggedIn");
      })
  }

}
