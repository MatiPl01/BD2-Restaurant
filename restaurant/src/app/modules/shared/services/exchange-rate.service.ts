import { Injectable } from '@angular/core';
import { HttpService } from "@core/services/http.service";
import { Observable } from "rxjs";
import { ExchangeRateData } from "@shared/interfaces/exchangeRate.interface";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { DishData } from '@dishes/interfaces/dish.interface';
import { CurrencyData } from '@shared/interfaces/currency.interface';
import { CurrencyService } from './currency.service';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  constructor(private httpService: HttpService,
              private currencyService: CurrencyService) {}

  getExchangeRate(from:string,to:string,date:Date):Observable<ExchangeRateData>{
    return this.httpService.get<ExchangeRateData>(ApiPathEnum.EXCHANGE_RATES+'?from='+from+'&to='+to+'date='+date)
  }

  addExchangeRate(exchangeRate:ExchangeRateData):Observable<ExchangeRateData>{
    return this.httpService.post<ExchangeRateData>(ApiPathEnum.EXCHANGE_RATES,exchangeRate)
  }
}
