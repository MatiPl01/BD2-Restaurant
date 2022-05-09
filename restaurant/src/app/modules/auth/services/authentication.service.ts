import { Injectable } from "@angular/core";
import { LoginCredentials } from "@auth/interfaces/login-credentials.interface";
import { HttpService } from "@core/services/http.service";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { BehaviorSubject, catchError, firstValueFrom, Observable, Subject, tap, throwError } from "rxjs";
import { AuthData } from "@auth/interfaces/auth.interface";
import { RegisterCredentials } from "@auth/interfaces/register-credentials.interface";
import { PersistenceEnum } from "@shared/enums/persistence.enum";
import { Config } from "@shared/interfaces/config.interface";
import { HttpResponse } from "@shared/interfaces/http-response.interface";
import User from "@auth/models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private static readonly SAVE_USER_KEY = 'user';
  private static readonly ERR_MSG = 'Wystąpił niezidentyfikowany problem';
  private logoutTimeout: ReturnType<typeof setTimeout> | null = null;
  private _user = new BehaviorSubject<User | null>(null);

  constructor(private httpService: HttpService) {}

  get user(): Subject<User | null> {
    return this._user;
  }

  public login(credentials: LoginCredentials): Observable<HttpResponse<AuthData>> {
    return this.httpService
      .post<HttpResponse<AuthData>>(ApiPathEnum.LOGIN, credentials)
      .pipe(
        catchError(this.handleError),
        tap(this.authenticate.bind(this))
      );
  }

  public register(credentials: RegisterCredentials): Observable<HttpResponse<AuthData>> {
    return this.httpService
      .post<HttpResponse<AuthData>>(ApiPathEnum.REGISTER, credentials)
      .pipe(
        catchError(this.handleError),
        tap(this.authenticate.bind(this))
      );
  }

  public logout(): void {
    this.user.next(null);
    this.removeStoredUser();

    if (this.logoutTimeout) {
      clearTimeout(this.logoutTimeout);
      this.logoutTimeout = null;
    }

    window.location.reload();
  }

  public async getPersistence(): Promise<PersistenceEnum> {
    const res = await firstValueFrom(
      this.httpService.get<HttpResponse<Config>>(ApiPathEnum.CONFIG)
    );
    if (res.data) return res.data.persistence;
    console.error(res.message);
    return PersistenceEnum.NONE;
  }

  public autoLogin(): void {
    // Try to load the user from the browser storage
    const user = this.loadUser();
    // Return if no user was found
    if (!user) return;
    // If a token is valid (hasn't expired), log in an user again
    if (user.token) {
      // Setup the auto logout
      this.autoLogout(user.tokenExpirationDuration);
      // Save the user
      this.user.next(user);
    }
  }

  private autoLogout(timeout: number): void {
    this.logoutTimeout = setTimeout(() => {
      this.logout();
    }, timeout);
  }

  private handleError(err: { error?: { message: string } }): Observable<never> {
    let errMsg = AuthenticationService.ERR_MSG;
    if (err.error) errMsg = err.error.message;
    return throwError(() => errMsg);
  }

  private authenticate(res: HttpResponse<AuthData>): void {
    if (!res.data) throw new Error(AuthenticationService.ERR_MSG);
    const { user: userData, token } = res.data;
    console.log(res);
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
