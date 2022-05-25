import { Injectable } from '@angular/core'
import { HttpService } from "@core/services/http.service";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import {Observable} from "rxjs";
import DetailedCartItem from "@cart/interfaces/detailed-cart-item.interface";
import {CartItem} from "@cart/types/cart-item.type";


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpService: HttpService) {
  }

  getUserDetailedCart(currency:string): Observable<DetailedCartItem[]> {
    return this.httpService.get<DetailedCartItem[]>(ApiPathEnum.USER_CART+'?currency='+currency);
  }

  setUserCart(cart:CartItem[]): Observable<CartItem[]> {
    return this.httpService.post<CartItem[]>(ApiPathEnum.USER_CART,cart);
  }

  clearUserCart(): void {
    this.setUserCart([]).subscribe();
  }
}
