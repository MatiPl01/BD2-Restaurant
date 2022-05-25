import { Component, Input } from '@angular/core';
import { CurrencyService } from '@core/services/currency.service';
import { DishCard } from '@dishes/interfaces/dish-card.interface';
import { RoleEnum } from '@shared/enums/role.enum';

@Component({
  selector: 'dishes-card',
  templateUrl: './card.component.html'
})
export class CardComponent {
  @Input() dish!: DishCard;
  public RoleEnum = RoleEnum;

  constructor(public currencyService: CurrencyService) {}
}
