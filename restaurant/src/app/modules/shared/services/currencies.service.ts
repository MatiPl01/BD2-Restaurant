import { Injectable } from '@angular/core';
import {HttpService} from "@core/services/http.service";
import {Observable} from "rxjs";
import {ReviewData} from "../../reviewes/interfaces/review.interface";
import {CurrencyData} from "@shared/interfaces/currency.interface";
import {ApiPathEnum} from "@shared/enums/api-path.enum";


@Injectable()
export class CurrenciesService {
  constructor(private httpService: HttpService) {}

  getCurrencies():Observable<CurrencyData[]> {
    return this.httpService.get<CurrencyData[]>(ApiPathEnum.CURRENCIES)
  }

  getSpecificCurrency(code:string):Observable<CurrencyData>{
    return this.httpService.get<CurrencyData>(ApiPathEnum.CURRENCIES+'/'+code)
  }

}
