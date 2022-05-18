import { Injectable } from '@angular/core';
import {HttpService} from "@core/services/http.service";
import {firstValueFrom, Observable} from "rxjs";
import {ReviewData} from "../../reviewes/interfaces/review.interface";
import {CurrencyData} from "@shared/interfaces/currency.interface";
import {ApiPathEnum} from "@shared/enums/api-path.enum";
import {DishData} from "@dishes/interfaces/dish.interface";
import { AuthService } from '@auth/services/auth.service';
import {CurrencyEnum} from "@shared/enums/currency.enum";


@Injectable()
export class CurrenciesService {
  constructor(private httpService: HttpService,
              private authService: AuthService) {}

  getCurrencies():Observable<CurrencyData[]> {
    return this.httpService.get<CurrencyData[]>(ApiPathEnum.CURRENCIES)
  }

  getSpecificCurrency(code:string):Observable<CurrencyData>{
    return this.httpService.get<CurrencyData>(ApiPathEnum.CURRENCIES+'/'+code)
  }

  async getActualCurrency():Promise<CurrencyData>{
    let currencySymbol:CurrencyEnum=await this.authService.getCurrency()
    let result:CurrencyData={} as CurrencyData
    await this.getSpecificCurrency(currencySymbol.valueOf()).subscribe(res=>result=res)
    return result;
  }
}
