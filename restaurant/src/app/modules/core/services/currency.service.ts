import { Injectable } from '@angular/core';
import { HttpService } from "@core/services/http.service";
import { BehaviorSubject, map, Observable, Subscription } from "rxjs";
import { Currency } from "@core/interfaces/currency.interface";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { AuthService } from '@auth/services/auth.service';
import { ConfigService } from './config.service';
import CurrencyModel from '@core/models/currency.model';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private readonly currency$ = new BehaviorSubject<Currency | null>(null);
  private readonly subscriptions: Subscription[] = [];

  constructor(private httpService: HttpService,
              private authService: AuthService,
              private configService: ConfigService) {
    this.subscriptions.push(
      this.authService.userSubject.subscribe(user => {
        // Update the current currency it the current user has changed
        // their currency
        if (user && user.defaultCurrency !== this.currency?.code) {
          this.setCurrency(user.defaultCurrency);
        }
      }),
      this.configService.configSubject.subscribe(config => {
        // Update the current currency if the main config currency was modified
        // and there is no user currently logged in
        if (!this.authService.user && config.mainCurrency !== this.currency?.code) {
          this.setCurrency(config.mainCurrency);
        }
      })
    )
  }

  get currencySubject(): BehaviorSubject<Currency | null> {
    return this.currency$;
  }

  get currency(): Currency | null {
    return this.currencySubject.getValue();
  }

  get displaySymbolOnTheLeft(): boolean {
    return this.currency?.symbol.length === 1;
  }

  public fetchCurrencies(): Observable<Currency[]> {
    return this.httpService
      .get<Currency[]>(ApiPathEnum.CURRENCIES)
      .pipe(map(currencies => {
        return currencies.map(currency => new CurrencyModel(currency))
      }));
  }

  public fetchCurrency(code: string): Observable<Currency> {
    return this.httpService
      .get<Currency>(`${ApiPathEnum.CURRENCIES}/${code}`)
      .pipe(map(currency => new CurrencyModel(currency)));
  }

  private async setCurrency(code: string): Promise<void> {
    this.fetchCurrency(code).subscribe(currency => {
      this.currency$.next(currency);
    })
  }
}
