import {Component, OnDestroy, OnInit} from '@angular/core';
import { Order } from '@cart/interfaces/order.interface';
import { Subscription } from 'rxjs';
import {OrderService} from "@cart/services/order.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnDestroy,OnInit{
  orders: Order[] = [];

  private readonly subscriptions: Subscription[] = [];

  constructor(private orderService: OrderService) {
    this.orderService.fetchCurrentUserOrders()
    this.subscriptions.push(
      this.orderService.ordersSubject.subscribe(orders => {
        this.orders = orders;
      })
    );
  }

  ngOnInit(): void {
    this.orderService.fetchCurrentUserOrders()
    this.orderService.ordersSubject.subscribe(orders => {
      this.orders = orders;
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
