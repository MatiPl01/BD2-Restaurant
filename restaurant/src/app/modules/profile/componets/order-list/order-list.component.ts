import { Component, OnInit } from '@angular/core';
import { Order } from 'app/modules/order - TODO/interfaces/order.interface';
import {OrderService} from "../../../order - TODO/services/order.service";
import {CurrencyService} from "@core/services/currency.service";

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
