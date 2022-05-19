import { Component } from '@angular/core';
import Dish from '@dishes/models/dish.model';
import { DishService } from '@dishes/services/dish.service';

@Component({
  selector: 'dishes-dishes-view',
  templateUrl: './dishes-list-view.component.html'
})
export class DishesListViewComponent {
  constructor(private dishService: DishService) {
    
  }
}
