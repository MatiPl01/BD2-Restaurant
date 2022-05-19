import { Component, Input } from '@angular/core';
import Dish from '@dishes/models/dish.model';

@Component({
  selector: 'dishes-dish-card',
  templateUrl: './dish-card.component.html'
})
export class DishCardComponent {
  @Input() dish!: Partial<Dish>;

  constructor() { }

  public changeQuantity(): void {
    // TODO
  }
}
