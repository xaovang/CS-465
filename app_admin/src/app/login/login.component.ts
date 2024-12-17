import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formError: string = '';

  // Credentials object updated with 'name'
  public credentials: User = {
    name: 'Default User', // Provide a default value for 'name' during login
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  public onLoginSubmit(): void {
    this.formError = '';
  
    // Validate required fields
    if (!this.credentials.email || !this.credentials.password || !this.credentials.name) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doLogin();
    }
  }
  
  private doLogin(): void {
    this.authenticationService
      .login(this.credentials)
      .then(() => {
        this.router.navigateByUrl('/list-trips'); // Redirect after login
      })
      .catch((error) => {
        this.formError = 'Invalid credentials, please try again.';
        console.error('Login Error:', error);
      });
  }
  
}  
