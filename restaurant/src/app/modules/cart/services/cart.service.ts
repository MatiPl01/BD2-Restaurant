import { Injectable } from '@angular/core'
import { HttpService } from "@core/services/http.service";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { BehaviorSubject, map, Subscription } from "rxjs";
import * as queryString from 'query-string';
import { Cart } from '@cart/types/cart.type';
import DetailedCartItemModel from '@cart/models/detailed-cart-item.model';
import { AuthService } from '@auth/services/auth.service';
import { RoleEnum } from '@shared/enums/role.enum';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly cart$ = new BehaviorSubject<Cart>([]);

  private currencyCode!: string;
  private readonly subscriptions: Subscription[] = [];

  constructor(private httpService: HttpService,
              private authService: AuthService) {
    this.subscriptions.push(
      this.authService.userSubject.subscribe(user => {
        if (user && user.roles.includes(RoleEnum.USER)) {
          this.currencyCode = user.defaultCurrency;
          this.fetchCart();
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  get cartSubject(): BehaviorSubject<Cart> {
    if (this.cart$.getValue() == []) {
      this.fetchCart();
    }
    return this.cart$;
  }

  get cart(): Cart {
    return this.cart$.getValue();
  }

  public setCart(cart: Cart): void {
    this.cart$.next(cart)
    this.postCart(cart); // TODO - maybe post with some delay after more than one update
  }

  public clearCart(): void {
    this.cart$.next([]);
  }

  private fetchCart(): void {
    const url = queryString.stringifyUrl({
      url: `${ApiPathEnum.USER_CART}`,
      query: { currency: this.currencyCode }
    })

    this.httpService
      .get<Cart>(url)
      .pipe(map(cart => cart.map(cartItem => new DetailedCartItemModel(cartItem))))
      .subscribe(cart => this.cart$.next(cart));
  }

  private postCart(cart: Cart): void {
    this.httpService
      .post<Cart>(ApiPathEnum.USER_CART, cart.map(item => {
        return {
          dish: item.dishId,
          quantity: item.quantity
        }
      })).subscribe();
  }
}
