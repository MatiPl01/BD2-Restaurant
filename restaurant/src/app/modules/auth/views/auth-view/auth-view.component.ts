import { Component } from '@angular/core';
// import { RegisterData } from "@auth/interfaces/register-credentials.interface";
// import { LoginData } from "@auth/interfaces/login-credentials.interface";
import { AuthService } from "@auth/services/auth.service";

@Component({
  selector: 'auth-view',
  templateUrl: './auth-view.component.html'
})
export class AuthViewComponent {
  openTab: string = 'login-form'
  isLoading: boolean = false
  loginErrorMsg: string = ''
  registrationErrorMsg: string = ''

  // constructor(private authService: AuthService,
  //             private navigationService: NavigationService) {}

  setOpenTab(tabName: string): void {
    this.openTab = tabName
  }

  // onLogin(userData: LoginData) {
  //   // this.isLoading = true
  //   // this.authService.loginUser(userData).subscribe({
  //   //   next: () => this.navigationService.back(),
  //   //   error: (errorMsg: any) => this.loginErrorMsg = errorMsg
  //   // }).add(() => this.isLoading = false)
  // }
  //
  // onRegistration(userData: RegisterData) {
    // this.isLoading = true
    // this.authService.registerUser(userData).subscribe({
    //   next: () => this.navigationService.back(),
    //   error: (errorMsg: string) => this.registrationErrorMsg = errorMsg
    // }).add(() => this.isLoading = false)
  }







  constructor(private authService: AuthService) {
    authService.login();
  }
}
