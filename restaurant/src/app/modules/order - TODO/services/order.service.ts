import { Injectable } from '@angular/core';
import {HttpService} from "@core/services/http.service";
import {CartItem} from "@cart/types/cart-item.type";
import {Observable} from "rxjs";
import {Order} from "../interfaces/order.interface";
import {ApiPathEnum} from "@shared/enums/api-path.enum";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpService: HttpService) {}

  createOrder(currency:string,cart:CartItem[]):Observable<Order> {
    return this.httpService.post<Order>(ApiPathEnum.ORDERS,{items:cart,currency:currency})
  }

  getCurrentUserOrders():Observable<Order[]> {
    return this.httpService.get<Order[]>(ApiPathEnum.ORDERS)
  }
}
