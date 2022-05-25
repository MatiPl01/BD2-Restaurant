import { Component, OnDestroy } from '@angular/core';
import { CartService } from "@cart/services/cart.service";
import { CurrencyService } from "@core/services/currency.service";
import { HttpService } from "@core/services/http.service";
import { Currency } from '@core/interfaces/currency.interface';
import { OrderService } from '@cart/services/order.service';
import { Subscription } from 'rxjs';
import { Cart } from '@cart/types/cart.type';

@Component({
  selector: 'cart-cart-view',
  templateUrl: './cart-view.component.html'
})
export class CartViewComponent implements OnDestroy {
  public totalQuantity: number = 0;
  public totalPrice: number = 0;
  public cart!: Cart;
  public currency!: Currency;

  private readonly subscriptions: Subscription[] = [];

  constructor(private cartService: CartService,
              public currencyService: CurrencyService,
              private ordersService: OrderService,
              private httpService: HttpService) {
    this.subscriptions.push(
      this.currencyService.currencySubject.subscribe(currency => {
        if (currency) this.currency = currency;
      }),
      this.cartService.cartSubject.subscribe(cart => {
        this.updateCart(cart);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public onQuantityChange(event: { price: number, quantity: number }): void {
    this.totalPrice += event.price;
    this.totalPrice = Math.round(this.totalPrice * 100) / 100;
  }

  public onOrderBtnClick(): void {
    this.ordersService.orderItemsInCart();
  }

  public onRemoveItem(dishId: string): void {
    const removedDish = this.cart.find(item => item.dishId === dishId);
    if (!removedDish) return;
    this.cartService.setCart(this.cart.filter(item => item.dishId !== dishId));
  }

  private updateCart(cart: Cart): void {
    this.cart = cart;
    this.totalQuantity = cart
      .map(item => item.quantity)
      .reduce((sum, current) => sum + current, 0);
    let totalPrice = 0;
    for (let item of cart) {
      totalPrice += item.unitPrice * item.quantity
    }
    this.totalPrice = Math.round(totalPrice * 100) / 100;
  }
}
