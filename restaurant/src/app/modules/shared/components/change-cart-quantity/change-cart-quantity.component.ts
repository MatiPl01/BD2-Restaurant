import { Component, Input,Output, EventEmitter, OnInit } from '@angular/core'
import { AuthService } from '@auth/services/auth.service';
import { Dish } from "@dishes/interfaces/dish.interface";
import { HttpService } from "@core/services/http.service";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { CartService } from '@cart/services/cart.service';
import DetailedCartItem from "@cart/interfaces/detailed-cart-item.interface";
import { CartItem } from "@cart/types/cart-item.type";
import { CurrencyService } from '@core/services/currency.service';
import {RoleEnum} from "@shared/enums/role.enum";

@Component({
  selector: 'shared-change-cart-quantity',
  templateUrl: './change-cart-quantity.component.html'
})
export class ChangeCartQuantityComponent implements OnInit {
  @Input() dishId!: string
  @Output() changeQuantity = new EventEmitter<{price:number,quantity:number}>();
  dish:Dish={} as Dish
  quantity!: number
  cart:DetailedCartItem[]=[]

  constructor(private authService: AuthService,
              private httpService: HttpService,
              private cartService: CartService,
              private currencyService:CurrencyService) {
  }

  ngOnInit() {
    if(this.checkIfUser()) {
      this.cartService.getUserDetailedCart().subscribe(cart => {
        if (cart.length > 0)
          this.cart = cart
        if (cart.map(item => item.dishId).includes(this.dishId)) {
          for (let item of cart) {
            if (item.dishId == this.dishId) {
              this.quantity = item.quantity
              break;
            }
          }
        } else this.quantity = 0
      })

      const currency = this.currencyService.currency;
      if (!currency) throw new Error('Cannot get the current currency');

      this.httpService.get<Dish>(ApiPathEnum.DISHES + '/' + this.dishId + '?currency=' + currency.code).subscribe(dish => {
        this.dish = dish
      })
    }
  }

  checkIfUser():boolean{
    if(this.authService.user){
      return this.authService.user.roles.includes(RoleEnum.USER)
    }
    return false
  }

  onIncrement(event: Event) {
    this.quantity=Math.min(this.quantity+1, this.dish.stock);
    event.preventDefault()
    this.emitEvents(+1)
  }

  onDecrement(event: Event) {
    this.quantity=Math.max(this.quantity-1, 0);
    event.preventDefault()
    this.emitEvents(-1)
  }

  onInput(event: Event) {
    this.emitEvents(Math.max(Math.min(+((<HTMLInputElement>event.target).value) || 0, this.dish.stock), 0)-this.quantity)
    this.quantity = Math.max(Math.min(+((<HTMLInputElement>event.target).value) || 0, this.dish.stock), 0)
  }

  private emitEvents(quantity: number) {
    this.updateCart()
    this.changeQuantity.emit({price:this.dish.unitPrice*quantity,quantity:quantity})
  }

  private updateCart(){
    let flag=true
    let newCart:CartItem[]=this.cart.map(item=> {
      if(item.dishId==this.dishId){
        item.quantity=this.quantity
        flag=false
      }
      return {dish:item.dishId,quantity:item.quantity}
    })
    newCart=newCart.filter(item=> item.quantity>0)
    if(flag) {
      newCart.push({dish:this.dishId,quantity:this.quantity})
    }
    this.cartService.setUserCart(newCart).subscribe()
  }
}
