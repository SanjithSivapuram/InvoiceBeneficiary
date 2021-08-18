import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  msg: String;

  constructor(private userService: UserService, private route: Router) {
    this.signUpForm = new FormGroup({
      name: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    })
  }

  onSignUpFormSubmit() {
    let user: User = {
      name: this.signUpForm.value.name,
      username: this.signUpForm.value.username,
      password: this.signUpForm.value.password,
      role: this.signUpForm.value.role,
    }
    this.userService.postUser(user).subscribe(data => {
      this.route.navigateByUrl("/login?msg=sign-up%20success");
    },
      (err: any) => {
        this.msg = "Could Not Sign In";
      })
  }

}
