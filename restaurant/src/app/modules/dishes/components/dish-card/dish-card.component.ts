import { Component, Input } from '@angular/core';
import { CurrencyService } from '@core/services/currency.service';
import { DishCard } from '@dishes/interfaces/dish-card.interface';

@Component({
  selector: 'dishes-dish-card',
  templateUrl: './dish-card.component.html'
})
export class DishCardComponent {
  @Input() dish!: DishCard;

  constructor(public currencyService: CurrencyService) {}

  public changeQuantity(): void {
    // TODO
  }
}
