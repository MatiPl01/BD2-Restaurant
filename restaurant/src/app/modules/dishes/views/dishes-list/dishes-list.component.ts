import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Subscription } from 'rxjs'
import {DishData} from "@dishes/interfaces/dish.interface";
import {DishesService} from "@dishes/services/dishes.service";
import { AuthService } from '@auth/services/auth.service';
import { CurrencyEnum } from '@shared/enums/currency.enum';

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html'
})
export class DishesListComponent implements OnInit{
  dishes: DishData[] = []

  pageIdx: number = 1
  dishesPerPage: number = 10
  // filteringTrigger: number = 0
  // paginationTrigger: number = 0

  constructor(public dishesService: DishesService,
              public authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    this.dishesService.getDishes(this.pageIdx, this.dishesPerPage, await this.authService.getCurrency()).subscribe(res=>{
      this.dishes=res
    })
  }

// private refilterDishes() {
//     console.log('refilter')
//     this.filteringTrigger = (this.filteringTrigger + 1) % 2
//   }

// private recalculatePages() {
//     console.log('repaginate')
//     this.paginationTrigger = (this.paginationTrigger + 1) % 2
//   }

// private updatePages(data: any): void {
//     this.dishesPerPage = data.dishesPerPage
//     this.pageIdx = data.pageNum - 1
//   }

}
