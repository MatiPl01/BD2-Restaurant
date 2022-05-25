import { Component, OnInit,Input } from '@angular/core';
import {Order} from "../../../order - TODO/interfaces/order.interface";
import DetailedCartItem from "@cart/interfaces/detailed-cart-item.interface";
import {Dish} from "@dishes/interfaces/dish.interface";
import {ApiPathEnum} from "@shared/enums/api-path.enum";
import {HttpService} from "@core/services/http.service";
import { CurrencyService } from '@core/services/currency.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html'
})
export class OrderItemComponent implements OnInit {
  @Input()order!:Order
  orderList:DetailedCartItem[]=[]
  totalPrice=0

  constructor(private httpService:HttpService,
              public currencyService:CurrencyService) { }

  ngOnInit(): void {
    this.totalPrice=0
    for(let item of this.order.items){
      this.totalPrice+=item.unitPrice*item.quantity
      this.httpService.get<Dish>(`${ApiPathEnum.DISHES}/${item.dish}?currency=${this.currencyService.currency?.code}`).subscribe(dish => {
        this.orderList.push({
          dishId:dish._id,
          dishName:dish.name,
          category:dish.category,
          cuisine:dish.cuisine,
          type:dish.type,
          unitPrice:item.unitPrice,
          quantity:item.quantity,
          // @ts-ignore
          currency:this.currencyService.currency.code,
          stock:dish.stock,
          coverImage:dish.coverImage})
      })
    }
  }
}
