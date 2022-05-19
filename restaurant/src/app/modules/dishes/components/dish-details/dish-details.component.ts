import { Component, Input } from '@angular/core';
import Dish from '@dishes/models/dish.model';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html'
})
export class DishDetailsComponent {
  @Input() dish!: Partial<Dish>;
}
