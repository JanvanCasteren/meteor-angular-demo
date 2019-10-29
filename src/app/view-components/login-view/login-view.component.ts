import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  loading = false;
  error = false;
  model = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.error = false;
    this.authService.login(
      this.model.email,
      this.model.password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.error = true;
        // console.log(error);
      })
      .then(() => {
        this.loading = false;
      });
  }

}
