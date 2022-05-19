import { Injectable } from '@angular/core';
import { HttpService } from "@core/services/http.service";
import { Observable } from "rxjs";
import { CurrencyData } from "@shared/interfaces/currency.interface";
import { ApiPathEnum } from "@shared/enums/api-path.enum";


@Injectable()
export class CurrencyService {
  constructor(private httpService: HttpService) {}

  getCurrencies():Observable<CurrencyData[]> {
    return this.httpService.get<CurrencyData[]>(ApiPathEnum.CURRENCIES)
  }

  getSpecificCurrency(code:string):Observable<CurrencyData>{
    return this.httpService.get<CurrencyData>(ApiPathEnum.CURRENCIES+'/'+code)
  }

  // async getActualCurrency():Promise<CurrencyData>{
  //   let currencySymbol = await this.authService.getCurrency()
  //   let result:CurrencyData={} as CurrencyData
  //   await this.getSpecificCurrency(currencySymbol.valueOf()).subscribe(res=>result=res)
  //   return result;
  // }
}
