import { EventEmitter, Injectable } from "@angular/core";
import { AuthenticationService } from "@auth/services/authentication.service";
import { LoginCredentials } from "@auth/interfaces/login-credentials.interface";
import { RegisterCredentials } from "@auth/interfaces/register-credentials.interface";
import { AuthData } from "@auth/interfaces/auth.interface";

@Injectable()
export class AuthHelperService {
  public authEvent = new EventEmitter<AuthData | null>(); // TODO - use global loader service

  constructor(private authService: AuthenticationService) {}

  public login(credentials: LoginCredentials): void {
    // Emit null at the beginning of the authentication process
    this.authEvent.emit(null);
    // Emit the authentication result
    this.authService.login(credentials).subscribe((res: any) => {
      this.authEvent.emit(res);
    });
  }

  public register(credentials: RegisterCredentials): void {
    // Emit null at the beginning of the authentication process
    this.authEvent.emit(null);
    // Emit the authentication result
    this.authService.register(credentials).subscribe(res => {
      this.authEvent.emit(res);
    });
  }
}
