import { Injectable } from '@angular/core'
import { HttpService } from "@core/services/http.service";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { Observable } from "rxjs";
import { Cart } from "@cart/types/cart.type";

@Injectable()
export class CartService {
  constructor(private httpService: HttpService) {}

  getUserCart(): Observable<Cart> {
    return this.httpService.get<Cart>(ApiPathEnum.USER_CART);
  }

  setUserCart(): Observable<Cart> {
    return this.httpService.get<Cart>(ApiPathEnum.USER_CART);
  }

  deleteUserCart(): Observable<Cart> {
    return this.httpService.get<Cart>(ApiPathEnum.USER_CART);
  }
}
