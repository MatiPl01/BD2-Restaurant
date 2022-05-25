import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core'
import DetailedCartItem from "@cart/interfaces/detailed-cart-item.interface";
import { CartService } from '@cart/services/cart.service';
import { Currency } from '@core/interfaces/currency.interface';
import { CurrencyService } from '@core/services/currency.service';
import { RoleEnum } from '@shared/enums/role.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cart-cart-item',
  templateUrl: './cart-item.component.html',
  styles: [
  ]
})
export class CartItemComponent implements OnDestroy {
  @Output() changeQuantity = new EventEmitter<{price: number, quantity: number}>();
  @Output() removeItem = new EventEmitter<string>();
  @Input() item!: DetailedCartItem;

  public currency!: Currency;
  public RoleEnum = RoleEnum;

  private readonly subscriptions: Subscription[] = [];

  constructor(private currencyService: CurrencyService,
              public cartService: CartService) {
    this.subscriptions.push(
      this.currencyService.currencySubject.subscribe(currency => {
        if (currency) this.currency = currency;
      })
    );
  }

  get itemPrice() {
    return Math.round(this.item.unitPrice * this.item.quantity * 100) / 100;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public onRemoveClick(): void {
    const updatedCart = this.cartService.cart.filter(item => item.dishId !== this.item.dishId);
    this.cartService.setCart(updatedCart);
  }

  public onChangeQuantity(event: {price: number, quantity: number}): void {
    this.item.quantity += event.quantity;
    this.changeQuantity.emit(event);
  }
}
