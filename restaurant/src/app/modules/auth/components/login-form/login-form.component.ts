import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginCredentials } from "@auth/interfaces/login-credentials.interface";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
  @Input() errorMsg!: string;
  @Output() loginEvent = new EventEmitter<LoginCredentials>();

  public onSubmit(form: NgForm): void {
    if (form.valid) {
      const userData: LoginCredentials = {
        email: form.value.email,
        password: form.value.password
      };

      this.loginEvent.emit(userData);
    }
  }
}
