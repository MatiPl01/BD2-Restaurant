import { Injectable } from '@angular/core'
import { HttpService } from "@core/services/http.service";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { Observable } from "rxjs";
import DetailedCartItem from "@cart/interfaces/detailed-cart-item.interface";
import { CartItem } from "@cart/types/cart-item.type";
import { CurrencyService } from '@core/services/currency.service';
import * as queryString from 'query-string';


@Injectable({
  providedIn: 'root'
})
export class CartService { // TODO - maybe add BehaviorSubject
  constructor(private httpService: HttpService,
              private currencyService: CurrencyService) {
  }

  public getUserDetailedCart(): Observable<DetailedCartItem[]> {
    const currency = this.currencyService.currency;
    if (!currency) throw new Error('Cannot get the current currency');

    const url = queryString.stringifyUrl({
      url: `${ApiPathEnum.USER_CART}`,
      query: { currency: currency.code }
    })

    return this.httpService.get<DetailedCartItem[]>(url);
  }

  setUserCart(cart:CartItem[]): Observable<CartItem[]> {
    return this.httpService.post<CartItem[]>(ApiPathEnum.USER_CART,cart);
  }

  clearUserCart(): void {
    this.setUserCart([]).subscribe();
  }
}
