import { Component } from '@angular/core';
import { DishFilterData } from '@dishes/interfaces/dish-filter.interface';
import { DishService } from '@dishes/services/dish.service';
import { PaginationData } from '@shared/interfaces/pagination.interface';

@Component({
  selector: 'dishes-view',
  templateUrl: './dishes-view.component.html'
})
export class DishesViewComponent {
  pagesCount = 0
  maxDishes = 0

  constructor(private dishService: DishService) {}

  // subscriptionReload() {
  //   this.dishService.forceReload()
  //   this.dishService.dishes.subscribe(dishes => {
  //     this.pagesCount = this.dishService.getPagesCount()
  //     this.maxDishes = this.dishService.getDishesCount()
  //   })
  // }

  // onFilterReload(event: DishFilterData) {
  //   this.dishService.updateFilters(event)
  //   this.dishService.forceReload()
  //   this.subscriptionReload()
  // }
  // onPaginationChange(event: PaginationData) {
  //   this.dishService.updatePagination(event)
  //   this.subscriptionReload()
  // }
}
