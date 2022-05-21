import { Component } from '@angular/core';
import Dish from "@dishes/models/dish.model";
import {Subscription} from "rxjs";
import {DishService} from "@dishes/services/dish.service";
import {DishFilterData} from "@dishes/interfaces/dish-filter.interface";

@Component({
  selector: 'dishes-dishes-view',
  templateUrl: './dishes-list-view.component.html'
})
export class DishesListViewComponent {


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

  onFilterReload(event:DishFilterData){
    this.dishService.updateFilters(event)
    this.dishService.forceReload()
    this.dishService.dishes.subscribe(dishes=>{
      if(dishes==undefined)this.dishes=[]
      else this.dishes=dishes
    })
  }
}
