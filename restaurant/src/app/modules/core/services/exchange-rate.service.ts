import { Injectable } from '@angular/core';
import { HttpService } from "@core/services/http.service";
import { Observable } from "rxjs";
import { ExchangeRate } from "@core/interfaces/exchange-rate.interface";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { CurrencyService } from './currency.service';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  constructor(private httpService: HttpService,
              private currencyService: CurrencyService) {}

  getExchangeRate(from: string, to: string, date: Date): Observable<ExchangeRate>{
    return this.httpService.get<ExchangeRate>(ApiPathEnum.EXCHANGE_RATES+'?from='+from+'&to='+to+'date='+date)
  }

  addExchangeRate(exchangeRate:ExchangeRate): Observable<ExchangeRate>{
    return this.httpService.post<ExchangeRate>(ApiPathEnum.EXCHANGE_RATES,exchangeRate)
  }
}
