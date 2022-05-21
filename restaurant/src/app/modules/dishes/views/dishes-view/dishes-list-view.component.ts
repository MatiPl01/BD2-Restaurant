import { Component } from '@angular/core';
import Dish from "@dishes/models/dish.model";
import {Subscription} from "rxjs";
import {DishService} from "@dishes/services/dish.service";
import {DishFilterData} from "@dishes/interfaces/dish-filter.interface";
import {PaginationData} from "@shared/interfaces/pagination.interface";

@Component({
  selector: 'dishes-dishes-view',
  templateUrl: './dishes-list-view.component.html'
})
export class DishesListViewComponent {
  pagesCount=0
  maxDishes=0


  public dishes: Array<Partial<Dish>> = [];
  private readonly subscription: Subscription;

  constructor(public dishService: DishService) {
    this.subscription = this.dishService.dishes.subscribe(dishes => {
      this.dishes = dishes;
      this.pagesCount=this.dishService.getPagesCount()
      this.maxDishes=this.dishService.getDishesCount()
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  subscriptionReload(){
    this.dishService.forceReload()
    this.dishService.dishes.subscribe(dishes => {
      this.dishes = dishes;
      this.pagesCount=this.dishService.getPagesCount()
      this.maxDishes=this.dishService.getDishesCount()
    })
  }

  onFilterReload(event:DishFilterData){
    this.dishService.updateFilters(event)
    this.dishService.forceReload()
    this.subscriptionReload()
  }
  onPaginationChange(event:PaginationData){
    this.dishService.updatePagination(event)
    this.subscriptionReload()
  }
}
