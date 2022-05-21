import { Component } from '@angular/core';
import { DishService } from '@dishes/services/dish.service';
import { Subscription } from 'rxjs';
import Dish from '@dishes/models/dish.model';

@Component({
  selector: 'dishes-dishes-list',
  templateUrl: './dishes-list.component.html'
})
export class DishesListComponent {
  public dishes: Array<Partial<Dish>> = [];
  private readonly subscription: Subscription;

  constructor(public dishService: DishService) {
    this.subscription = this.dishService.dishes.subscribe(dishes => {
      this.dishes = dishes;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
