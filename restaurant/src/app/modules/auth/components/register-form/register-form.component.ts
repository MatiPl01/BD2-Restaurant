import { Component, ViewChild } from '@angular/core';
import { RegisterCredentials } from "@auth/types/register-credentials.interface";
import { NgForm } from "@angular/forms";
import { AuthHelperService } from "@auth/services/auth-helper.service";

@Component({
  selector: 'auth-register-form',
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {
  @ViewChild('f') form!: NgForm;

  public isEmailValid: boolean = false;

  constructor(private authHelperService: AuthHelperService) {}

  onSubmit(form: NgForm): void {
    if (form.valid && this.isEmailValid && form.value.password === form.value.repeatedPassword) {
      const credentials: RegisterCredentials = {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        nickName: form.value.nickName,
        email: form.value.email,
        password: form.value.password
      }

      this.authHelperService.register(credentials);
    }
  }

  onEmailInput(): void {
    this.isEmailValid = (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(this.form.value.email);
  }
}
