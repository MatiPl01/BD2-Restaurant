import { Component, Input,Output, EventEmitter, OnInit } from '@angular/core'
import { AuthService } from '@auth/services/auth.service';
import { Dish } from "@dishes/interfaces/dish.interface";
import { HttpService } from "@core/services/http.service";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { CartService } from '@cart/services/cart.service';
import DetailedCartItem from "@cart/interfaces/detailed-cart-item.interface";
import { CurrencyService } from '@core/services/currency.service';
import { RoleEnum } from "@shared/enums/role.enum";
import DetailedCartItemModel from '@cart/models/detailed-cart-item.model';

@Component({
  selector: 'shared-change-cart-quantity',
  templateUrl: './change-cart-quantity.component.html'
})
export class ChangeCartQuantityComponent implements OnInit {
  @Input() dishId!: string
  @Output() changeQuantity = new EventEmitter<{price: number, quantity: number}>();
  public dish: Dish={} as Dish;
  public quantity!: number;

  public RoleEnum = RoleEnum;

  constructor(public authService: AuthService,
              private httpService: HttpService,
              private cartService: CartService,
              private currencyService: CurrencyService) {
  }

  ngOnInit() {
    const cart = this.cartService.cart;

    if (cart.map(item => item.dishId).includes(this.dishId)) {
      for (let item of cart) {
        if (item.dishId == this.dishId) {
          this.quantity = item.quantity;
          break;
        }
      }
    } else this.quantity = 0;

    const currency = this.currencyService.currency;
    if (!currency) throw new Error('Cannot get the current currency');

    // TODO - fetch only the necessary fields - not all the dish data
    this.httpService.get<Dish>(ApiPathEnum.DISHES + '/' + this.dishId + '?currency=' + currency.code).subscribe(dish => {
      this.dish = dish
    })
  }

  public onIncrement(event: Event) {
    this.quantity = Math.min(this.quantity + 1, this.dish.stock);
    event.preventDefault()
    this.emitEvents(+1)
  }

  public onDecrement(event: Event) {
    this.quantity = Math.max(this.quantity - 1, 0);
    event.preventDefault()
    this.emitEvents(-1)
  }

  public onInput(event: Event) {
    this.emitEvents(Math.max(Math.min(+((<HTMLInputElement>event.target).value) || 0, this.dish.stock), 0) - this.quantity)
    this.quantity = Math.max(Math.min(+((<HTMLInputElement>event.target).value) || 0, this.dish.stock), 0)
  }

  private emitEvents(quantity: number) {
    this.updateCart()
    this.changeQuantity.emit({price:this.dish.unitPrice*quantity,quantity:quantity})
  }

  private updateCart() {
    const cart = this.cartService.cart;
    let isNewItem = true;

    let newCart: DetailedCartItem[] = cart
      .map(item => {
        let quantity = item.quantity;
        
        if (item.dishId == this.dishId) {
          quantity = this.quantity
          isNewItem = false;
        }

        return { ...item, quantity };
      })
      .filter(item => item.quantity > 0);

    newCart = newCart.filter(item => item.quantity > 0)
    if (isNewItem) newCart.push(DetailedCartItemModel.fromDish(this.dish, this.quantity));
    this.cartService.setCart(newCart);
  }
}
