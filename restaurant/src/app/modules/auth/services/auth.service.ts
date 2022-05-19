import { BehaviorSubject, firstValueFrom, Observable, tap } from "rxjs";
import { RegisterCredentials } from "@auth/interfaces/register-credentials.interface";
import { LoginCredentials } from "@auth/interfaces/login-credentials.interface";
import { PersistenceEnum } from "@shared/enums/persistence.enum";
// import { CurrencyEnum } from "@shared/enums/currency.enum";
import { HttpService } from "@core/services/http.service";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { Injectable } from "@angular/core";
import { AuthData } from "@auth/interfaces/auth.interface";
import { Config } from "@shared/interfaces/config.interface";
import User from "@shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly SAVE_USER_KEY = 'user';
  private logoutTimeout: ReturnType<typeof setTimeout> | null = null;
  private _user = new BehaviorSubject<User | null>(null);
  // private defaultCurrency=CurrencyEnum.USD   // TODO - Use string type as it will allow front-end app to serve new currency added on back-end (we won't have to update front-end)

  constructor(private httpService: HttpService,
              /*private configService: ConfigService*/) {}

  get userSubject(): BehaviorSubject<User | null> {
    return this._user;
  }

  get user(): User | null {
    return this._user.getValue();
  }

  public login(credentials: LoginCredentials): Observable<AuthData> {
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

    // TODO - do something better than
    window.location.reload();
  }

  public async getPersistence(): Promise<PersistenceEnum> {
    const config = await firstValueFrom(
      this.httpService.get<Config>(ApiPathEnum.CONFIG)
    );
    return config.persistence;
  }

  /* TODO - use currency service to get the current user currency
  (don't fetch from config, as user might have changed currency before
  logging in or creating an account - we should take the currently set currency)*/
  // public async getCurrency():Promise<CurrencyEnum>{
  //   const user = this.loadUser();
  //   if (user){
  //     return (CurrencyEnum as any)[user.defaultCurrency];
  //   }
  //   await this.configService.getConfig().subscribe(res=>{
  //     return (CurrencyEnum as any)[res.mainCurrency]
  //   })
  //   return this.defaultCurrency
  // }

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
    const { user: userData, token } = data;
    const user = new User(userData, token);
    this._user.next(user);
    this.autoLogout(user.tokenExpirationDuration);
    this.storeUser();
  }

  public async storeUser(): Promise<void> {
    const persistence = await this.getPersistence();
    if (persistence === PersistenceEnum.NONE) return;

    this._user.subscribe(user => {
      if (!user) return;
      if (persistence === PersistenceEnum.LOCAL) {
        localStorage.setItem(AuthService.SAVE_USER_KEY, JSON.stringify(user));
      } else if (persistence === PersistenceEnum.SESSION) {
        sessionStorage.setItem(AuthService.SAVE_USER_KEY, JSON.stringify(user));
      }
    });
  }

  public removeStoredUser(): void {
    // TODO MUST DO DUPLICATION NAV
    localStorage.removeItem(AuthService.SAVE_USER_KEY);
    sessionStorage.removeItem(AuthService.SAVE_USER_KEY);
  }

  private loadUser(): User | null {
    const userData = localStorage.getItem(AuthService.SAVE_USER_KEY)
                  || sessionStorage.getItem(AuthService.SAVE_USER_KEY);

    if (!userData) return null;
    const data = JSON.parse(userData);
    const user = new User(data, data._token);
    this._user.next(user);
    return user;
  }
}
