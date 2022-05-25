import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../order - TODO/services/order.service";
import {CurrencyService} from "@core/services/currency.service";
import {Order} from "@cart/interfaces/order.interface";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnInit {
  orders: Order[]=[]

  constructor(private orderService: OrderService,private currencyService: CurrencyService) {
    // @ts-ignore
    this.orderService.getCurrentUserOrders(this.currencyService.currency.code).subscribe(orders=>{
      this.orders=orders
    }
    )
  }

  ngOnInit(): void {
  }

}
