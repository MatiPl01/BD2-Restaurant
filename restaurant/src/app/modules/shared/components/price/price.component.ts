import { Component, Input, OnInit } from '@angular/core'
import { CurrencyService } from '@core/services/currency.service';

@Component({
  selector: 'shared-price',
  template: `
  <div class="price" 
      [attr.data-display]="currencyService.displaySymbolOnTheLeft ? 'left' : 'right'">
    <p class="price__amount">{{ amount }}</p>
    <p class="price__currency">{{ currency}}</p>
  </div>
  `
})
export class PriceComponent implements OnInit {
  @Input() amount!: number;
  @Input() currency!: string;

  constructor(public currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.amount = +this.amount.toFixed(2);
  }
}
