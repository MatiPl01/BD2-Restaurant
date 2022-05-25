import { Component, Input } from '@angular/core';
import { CurrencyService } from '@core/services/currency.service';
import { DishCard } from '@dishes/interfaces/dish-card.interface';

@Component({
  selector: 'dishes-card',
  templateUrl: './card.component.html'
})
export class CardComponent {
  @Input() dish!: DishCard;

  constructor(public currencyService: CurrencyService) {}

  public changeQuantity(): void {
    // TODO
  }
}
