import { Component, ViewChild } from '@angular/core';
import { LoginCredentials } from "@auth/interfaces/login-credentials.interface";
import { NgForm } from "@angular/forms";
import { AuthHelperService } from "@auth/services/auth-helper.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
  @ViewChild('f') form!: NgForm;

  public isEmailValid: boolean = false;

  constructor(private authHelperService: AuthHelperService) {}

  public onSubmit(form: NgForm): void {
    if (form.valid && this.isEmailValid) {
      const credentials: LoginCredentials = {
        email: form.value.email,
        password: form.value.password
      };

      this.authHelperService.login(credentials);
    }
  }

  onEmailInput(): void {
    this.isEmailValid = (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(this.form.value.email);
  }
}
