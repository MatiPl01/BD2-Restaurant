import { Component, Input, OnChanges } from '@angular/core'
import { CurrencyService } from '@core/services/currency.service';

@Component({
  selector: 'shared-price',
  template: `
  <div class="price" 
      [attr.data-display]="currencyService.displaySymbolOnTheLeft ? 'left' : 'right'">
    <p class="price__amount">{{ displayedAmount }}</p>
    <p class="price__currency">{{ currency}}</p>
  </div>
  `
})
export class PriceComponent implements OnChanges {
  @Input() amount!: number;
  @Input() currency!: string;
  public displayedAmount: string = '';

  constructor(public currencyService: CurrencyService) {}

  ngOnChanges(): void {
    this.displayedAmount = this.amount.toFixed(2);
  }
}
