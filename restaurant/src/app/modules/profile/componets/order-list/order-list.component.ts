import { Component, OnDestroy } from '@angular/core';
import { OrderService } from "../../../cart/services/order.service";
import { Order } from '@cart/interfaces/order.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnDestroy {
  orders: Order[] = [];

  private readonly subscriptions: Subscription[] = [];

  constructor(private orderService: OrderService) {
    this.subscriptions.push(
      this.orderService.ordersSubject.subscribe(orders => {
        this.orders = orders;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
