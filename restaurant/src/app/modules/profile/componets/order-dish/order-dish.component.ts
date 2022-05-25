import { Component, OnInit ,Input} from '@angular/core';
import { CurrencyService } from '@core/services/currency.service';
import DetailedCartItem from "@cart/interfaces/detailed-cart-item.interface";

@Component({
  selector: 'app-order-dish',
  templateUrl: './order-dish.component.html'
})
export class OrderDishComponent implements OnInit {
  @Input() dish!: DetailedCartItem;

  constructor(public currencyService: CurrencyService) { }

  ngOnInit(): void {
  }
  getPrice() {
    return Math.round(this.dish.unitPrice*this.dish.quantity*100)/100
  }


}
