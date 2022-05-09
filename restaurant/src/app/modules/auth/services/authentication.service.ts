import { BehaviorSubject, firstValueFrom, Observable, tap } from "rxjs";
import { RegisterCredentials } from "@auth/interfaces/register-credentials.interface";
import { LoginCredentials } from "@auth/interfaces/login-credentials.interface";
import { PersistenceEnum } from "@shared/enums/persistence.enum";
import { HttpService } from "@core/services/http.service";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { Injectable } from "@angular/core";
import { AuthData } from "@auth/interfaces/auth.interface";
import { Config } from "@shared/interfaces/config.interface";
import User from "@shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private static readonly SAVE_USER_KEY = 'user';
  private logoutTimeout: ReturnType<typeof setTimeout> | null = null;
  private _user = new BehaviorSubject<User | null>(null);

  constructor(private httpService: HttpService) {}

  get userSubject(): BehaviorSubject<User | null> {
    return this._user;
  }

  get user(): User | null {
    return this._user.getValue();
  }

  public login(credentials: LoginCredentials): Observable<AuthData> {
    console.log('login', credentials)
    return this.httpService
      .post<AuthData>(ApiPathEnum.LOGIN, credentials)
      .pipe(tap(this.authenticate.bind(this)));
  }

  public register(credentials: RegisterCredentials): Observable<AuthData> {
    return this.httpService
      .post<AuthData>(ApiPathEnum.REGISTER, credentials)
      .pipe(tap(this.authenticate.bind(this)));
  }

  public logout(): void {
    this._user.next(null);
    this.removeStoredUser();

    if (this.logoutTimeout) {
      clearTimeout(this.logoutTimeout);
      this.logoutTimeout = null;
    }

    window.location.reload();
  }

  public async getPersistence(): Promise<PersistenceEnum> {
    const config = await firstValueFrom(
      this.httpService.get<Config>(ApiPathEnum.CONFIG)
    );
    return config.persistence;
  }

  public autoLogin(): void {
    // Try to load the user from the browser storage
    const user = this.loadUser();
    // Return if no user was found
    if (!user) return;
    // If a token is valid (hasn't expired), log in the user again
    if (user.token) {
      // Set up the auto logout
      this.autoLogout(user.tokenExpirationDuration);
      // Save the user
      this._user.next(user);
    }
  }

  private autoLogout(timeout: number): void {
    this.logoutTimeout = setTimeout(() => {
      this.logout();
    }, timeout);
  }

  private authenticate(data: AuthData): void {
    console.log(data);
    const { user: userData, token } = data;
    const user = new User(userData, token);
    this._user.next(user);
    this.autoLogout(user.tokenExpirationDuration);
    this.storeUser();
  }

  private async storeUser(): Promise<void> {
    const persistence = await this.getPersistence();
    if (persistence === PersistenceEnum.NONE) return;

    console.log(persistence)

    this._user.subscribe(user => {
      if (!user) return;

      if (persistence === PersistenceEnum.LOCAL) {
        localStorage.setItem(AuthenticationService.SAVE_USER_KEY, JSON.stringify(user));
      } else if (persistence === PersistenceEnum.SESSION) {
        sessionStorage.setItem(AuthenticationService.SAVE_USER_KEY, JSON.stringify(user));
      }
    });
  }

  private removeStoredUser(): void {
    localStorage.removeItem(AuthenticationService.SAVE_USER_KEY);
    sessionStorage.removeItem(AuthenticationService.SAVE_USER_KEY);
  }

  private loadUser(): User | null {
    const userData = localStorage.getItem(AuthenticationService.SAVE_USER_KEY)
                  || sessionStorage.getItem(AuthenticationService.SAVE_USER_KEY);

    if (!userData) return null;
    const data = JSON.parse(userData);
    const user = new User(data, data._token);
    this._user.next(user);
    return user;
  }
}
