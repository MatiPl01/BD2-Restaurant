import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { RegisterCredentials } from "@auth/interfaces/register-credentials.interface";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {
  @Input() errorMsg!: string
  @Output() registerEvent = new EventEmitter<RegisterCredentials>()
  @ViewChild('f') form!: NgForm

  isEmailValid: boolean = false;

  onSubmit(form: NgForm): void {
    if (form.valid && this.isEmailValid && form.value.password === form.value.repeatedPassword) {
      const userData: RegisterCredentials = {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        nickName: form.value.nickName,
        email: form.value.email,
        password: form.value.password
      }

      this.registerEvent.emit(userData);
    }
  }

  onEmailInput(): void {
    this.isEmailValid = (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(this.form.value.email);
  }
}
