import { EventEmitter, Injectable } from "@angular/core";
import { AuthService } from "@auth/services/auth.service";
import { LoginCredentials } from "@auth/interfaces/login-credentials.interface";
import { RegisterCredentials } from "@auth/interfaces/register-credentials.interface";
import { AuthData } from "@auth/interfaces/auth.interface";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthHelperService {
  public authEvent = new EventEmitter<AuthData | null>(); // TODO - use global loader service

  constructor(private authService: AuthService,
              private router: Router) {}

  public login(credentials: LoginCredentials): void {
    this.authenticate<LoginCredentials>(
      credentials, 
      this.authService.login.bind(this.authService)
    );
  }

  public register(credentials: RegisterCredentials): void {
    this.authenticate<RegisterCredentials>(
      credentials, 
      this.authService.register.bind(this.authService)
    );
  }

  private authenticate<T>(
    credentials: T, 
    authFn: (credentials: T) => Observable<AuthData>
  ): void {
    // Emit null at the beginning of the authentication process
    this.authEvent.emit(null);
    // Emit the authentication result
    authFn(credentials).subscribe(res => {
      this.authEvent.emit(res);
      // TODO - redirect to the previous route
      this.router.navigate(['/']);
    });
  }
}
