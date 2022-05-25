import {Component} from '@angular/core';
import {CartService} from "@cart/services/cart.service";
import {CurrencyService} from "@core/services/currency.service";
import DetailedCartItem from "@cart/interfaces/detailed-cart-item.interface";
import {CartItem} from "@cart/types/cart-item.type";
import {OrderService} from "../../../order - TODO/services/order.service";
import {Dish} from "@dishes/interfaces/dish.interface";
import {ApiPathEnum} from "@shared/enums/api-path.enum";
import {HttpService} from "@core/services/http.service";

@Component({
  selector: 'cart-cart-view',
  templateUrl: './cart-view.component.html'
})
export class CartViewComponent {
  totalQuantity: number = 0
  totalPrice: number = 0
  cartDishes: DetailedCartItem[] = []

  constructor(private cartService: CartService, public currencyService: CurrencyService,private ordersService: OrderService,private httpService:HttpService) {
    this.setCart()
  }

  private setCart() {
    this.cartService.getUserDetailedCart(this.currencyService.currency.code).subscribe(cart => {
      if (cart.length > 0) {
        this.cartDishes = cart
        this.totalQuantity = cart.map(item => item.quantity).reduce((sum, current) => sum + current)
        this.totalPrice = 0
        for (let item of cart) {
          this.totalPrice += item.unitPrice * item.quantity
        }
        this.totalPrice = Math.round(this.totalPrice * 100) / 100
      }
    })
  }

  onChangeQuantity(event: {price:number,quantity:number}) {
    this.totalPrice+=event.price
    this.totalPrice=Math.round(this.totalPrice*100)/100
    this.totalQuantity+=event.quantity
  }

  onOrderBtnClick() {
    this.cartService.getUserDetailedCart(this.currencyService.currency.code).subscribe(cart=>{
      if(cart.length>0){
        const cartItems:CartItem[]=cart.map(item=>{
          this.httpService.patch<Dish>(ApiPathEnum.DISHES + '/' + item.dishId,{stock:item.stock-item.quantity}).subscribe()
          return {dish:item.dishId,quantity:item.quantity}
        })
        this.ordersService.createOrder(this.currencyService.currency.code,cartItems).subscribe()
      }
    })
    this.cartService.clearUserCart()
    this.totalQuantity= 0
    this.totalPrice = 0
    this.cartDishes= []
  }
  onRemoveItem(event:string){
    this.cartDishes=this.cartDishes.filter(item=>item.dishId!=event)
  }
}
