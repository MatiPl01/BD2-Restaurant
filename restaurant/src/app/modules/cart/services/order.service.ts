import { Injectable } from '@angular/core';
import { HttpService } from "@core/services/http.service";
import { BehaviorSubject, map } from "rxjs";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { Order } from "@cart/interfaces/order.interface";
import { CartService } from './cart.service';
import { Dish } from '@dishes/interfaces/dish.interface';
import { CartItem } from '@cart/types/cart-item.type';
import * as queryString from 'query-string';
import OrderModel from '@cart/models/order.model';
import {CurrencyService} from "@core/services/currency.service";


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly orders$ = new BehaviorSubject<Order[]>([]);

  constructor(private httpService: HttpService,
              private cartService: CartService,
              private currencyService: CurrencyService) {}

  get ordersSubject(): BehaviorSubject<Order[]> {
    if (!this.orders$.getValue()) this.fetchCurrentUserOrders();
    return this.orders$;
  }

  get orders(): Order[] {
    return this.orders$.getValue();
  }

  public orderItemsInCart(): void {
    const cart = this.cartService.cart;

    cart.forEach(item => {
      this.httpService.patch<Dish>(`${ApiPathEnum.DISHES}/${item.dishId}`, {
        stock: item.stock - item.quantity
      }).subscribe();
    })

    this.postOrder(cart.map(item => {
      return {
        dish: item.dishId,
        quantity: item.quantity
      }
    }));
    this.cartService.clearCart();
  }

  private postOrder(items: CartItem[]): void {
    const currency = this.currencyService.currency;
    if (!currency) throw new Error('Cannot get current currency');

    this.httpService.post<Order>(ApiPathEnum.ORDERS, { items, currency: currency.code }).subscribe();
    this.fetchCurrentUserOrders();
  }

  fetchCurrentUserOrders(): void {
    const currency = this.currencyService.currency;
    if (!currency) throw new Error('Cannot get current currency');

    const url = queryString.stringifyUrl({
      url: ApiPathEnum.ORDERS,
      query: { currency: currency.code }
    })

    this.httpService.get<Order[]>(url)
      .pipe(map(orders => orders.map(order => new OrderModel(order))))
      .subscribe(orders => this.orders$.next(orders));  // TODO - add orders pagination and fetch only a part of all user orders
  }
}
