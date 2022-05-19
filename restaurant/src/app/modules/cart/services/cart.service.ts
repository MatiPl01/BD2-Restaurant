import { Injectable } from '@angular/core'
import { HttpService } from "@core/services/http.service";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { Observable } from "rxjs";
import { Cart } from "@cart/types/cart.type";
import {DetailedCartItem, MiniCartItem} from "@cart/interfaces/cart-item.interface";


@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private httpService: HttpService) {}

  getUserDetailedCart(): Observable<DetailedCartItem[]> {
    return this.httpService.get<DetailedCartItem[]>(ApiPathEnum.USER_CART);
  }
  getUserMiniCart(): Observable<MiniCartItem[]> {
    return this.httpService.get<MiniCartItem[]>(ApiPathEnum.USERS+'/mini-cart');
  }

  setUserCart(): Observable<Cart> {
    return this.httpService.get<Cart>(ApiPathEnum.USER_CART);
  }

  deleteUserCart(): Observable<Cart> {
    return this.httpService.get<Cart>(ApiPathEnum.USER_CART);
  }
}
