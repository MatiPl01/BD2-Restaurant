import { Component, EventEmitter, Input, Output } from '@angular/core'
import DetailedCartItem from "@cart/interfaces/detailed-cart-item.interface";
import { CartService } from '@cart/services/cart.service';
import { Currency } from '@core/interfaces/currency.interface';
import { CurrencyService } from '@core/services/currency.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styles: [
  ]
})
export class CartItemComponent{
  @Output() changeQuantity = new EventEmitter<{price: number, quantity: number}>();
  @Output() removeItem = new EventEmitter<string>();
  @Input() dish!: DetailedCartItem;

  public currency!: Currency;

  private readonly subscriptions: Subscription[] = [];

  constructor(private currencyService: CurrencyService,
              public cartService: CartService) {
    this.subscriptions.push(
      this.currencyService.currencySubject.subscribe(currency => {
        if (currency) this.currency = currency;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public onRemoveClick(): void {
    this.cartService.getUserDetailedCart().subscribe(cart=>{
      let newCart=cart.map(item=>{return {dish:item.dishId,quantity:item.quantity}})
      newCart=newCart.filter(item=>item.dish!=this.dish.dishId)
      this.cartService.setUserCart(newCart).subscribe()
      this.removeItem.emit(this.dish.dishId)
    })
  }

  public onChangeQuantity(event: {price: number, quantity: number}): void {
    this.dish.quantity+=event.quantity
    this.changeQuantity.emit(event)
  }

  getPrice() {
    return Math.round(this.dish.unitPrice*this.dish.quantity*100)/100
  }
}
