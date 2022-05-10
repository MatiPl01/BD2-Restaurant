import { BehaviorSubject, firstValueFrom, Subscription } from "rxjs";
import { Injectable, OnDestroy } from "@angular/core";
import { AuthService } from "@auth/services/auth.service";
import { HttpService } from "@core/services/http.service";
import { CurrencyEnum } from "@shared/enums/currency.enum";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { UserService } from "@shared/services/user.service";
import { Config } from "@shared/interfaces/config.interface";


@Injectable()
export class CurrencyService implements OnDestroy{
  private static readonly FALLBACK_CURRENCY = CurrencyEnum.PLN;
  private readonly subscriptions: Subscription[] = [];

  private _currency = new BehaviorSubject<CurrencyEnum>(CurrencyService.FALLBACK_CURRENCY);

  constructor(private httpService: HttpService,
              private userService: UserService,
              private authService: AuthService) {
    this.loadCurrency();

    this.subscriptions.push(
      this.authService.userSubject.subscribe(this.loadCurrency.bind(this))
    )
  }

  get currency(): CurrencyEnum {
    return this._currency.getValue();
  }

  get currencySubject(): BehaviorSubject<CurrencyEnum> {
    return this._currency;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public async getMainCurrency(): Promise<CurrencyEnum> {
    const config = await firstValueFrom(
      this.httpService.get<Config>(ApiPathEnum.CONFIG)
    );
    return config.mainCurrency;
  }

  public async updateCurrency(currency: CurrencyEnum): Promise<void> {
    if (this.currency === currency) return;
    this._currency.next(currency);
    const user = this.authService.user;
    if (user) this.userService.updateDefaultCurrency(currency);
  }

  private async loadCurrency(): Promise<void> {
    const user = this.authService.user;
    if (!user) this._currency.next(await this.getMainCurrency());
    else this._currency.next(user.currency);
  }
}
