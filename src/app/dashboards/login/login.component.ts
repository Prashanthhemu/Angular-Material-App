import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticateRequest } from 'src/app/core/models/authenticate-request';
import { LoginService } from 'src/app/core/services/login.service';
import { TokenAuthenticationService } from 'src/app/core/services/token-authentication.service';
import { environment } from '../../../environments/environment';
import { Utilities } from 'src/app/core/common/utilities';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  errorMessage: string;
  userEnteredCredentials: AuthenticateRequest = {};
  constructor(private _loginService: LoginService,
    private _tokenAuthenticationService: TokenAuthenticationService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _utilities: Utilities) {
  }

  ngOnInit() {
    this.userForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(environment.maxCharacters)]],
      password: ['', [Validators.required, Validators.maxLength(environment.maxCharacters), Validators.minLength(8)]]
    });
  }

  get f() { return this.userForm.controls; }

  buttonClick(event) {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    const targetValue = event.target;
    this.userEnteredCredentials.userName = targetValue.querySelector('#username').value;
    this.userEnteredCredentials.password = targetValue.querySelector('#password').value;
    this._loginService.getUserAuthenticationDetails(this.userEnteredCredentials).subscribe((userData: any) => {
      this.validateUserAuthentication(userData);
    },
      (error) => {
        let message = this._utilities.hasError(error);
        this.errorMessage = message;
      });
  }

  validateUserAuthentication(userData) {
    if (!userData.isException && userData.errorMessage == null) {
      this._tokenAuthenticationService.toggleTokenChange(userData.model.token);
      this._router.navigate(['/base']);
    }
  }
}
