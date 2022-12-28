import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any = '';
  socialUser: any = '';
  isLoggedIn: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private googleAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.googleAuthService.authState.subscribe((user) => {
        this.socialUser = user;
        this.isLoggedIn = (user != null);
        console.log(this.socialUser);
    });
  }

  loginWithGoogle(): void {
    this.googleAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
}

  logOut(): void {
      this.googleAuthService.signOut();
  }
}
