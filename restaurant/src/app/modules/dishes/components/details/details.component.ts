import { Component, Input } from '@angular/core';
import Dish from '@dishes/models/dish.model';

@Component({
  selector: 'dishes-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent {
  @Input() dish!: Partial<Dish>;
}
