import { Component } from '@angular/core';
import { DishCardsService } from '@dishes/services/dish-cards.service';

@Component({
  selector: 'dishes-view',
  templateUrl: './dishes-view.component.html',
  providers: [DishCardsService] // Make this service available only in the dishes list view
})
export class DishesViewComponent {}
