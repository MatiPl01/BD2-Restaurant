import { EventEmitter, Injectable } from "@angular/core";
import { AuthService } from "@auth/services/auth.service";
import { LoginCredentials } from "@auth/interfaces/login-credentials.interface";
import { HttpResponse } from "@shared/interfaces/http-response.interface";
import { RegisterCredentials } from "@auth/interfaces/register-credentials.interface";
import { AuthData } from "@auth/interfaces/auth.interface";

@Injectable()
export class AuthHelperService {
  public authEvent = new EventEmitter<HttpResponse<AuthData> | null>();

  constructor(private authService: AuthService) {}

  public login(credentials: LoginCredentials): void {
    // Emit null at the beginning of the authentication process
    this.authEvent.emit(null);
    // Emit the authentication result
    this.authService.login(credentials).subscribe(res => {
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
