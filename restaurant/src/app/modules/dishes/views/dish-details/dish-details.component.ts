import { Component, Input} from '@angular/core';
import {DishData} from "@dishes/interfaces/dish.interface";

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styles: [
  ]
})
export class DishDetailsComponent {
  @Input() dish!: DishData
}
