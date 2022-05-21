import { Component, OnDestroy } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider'
import { Subscription } from 'rxjs'
import { FilterService } from '@dishes/services/filter.service';
import { FilterAttr } from '@dishes/enums/filter-attr.enum';
import { DishFilters } from '@dishes/interfaces/dish-filters.interface';

@Component({
  selector: 'dishes-dishes-filters',
  templateUrl: './dishes-filters.component.html',
  providers: [FilterService]
})
export class DishesFiltersComponent implements OnDestroy {
  public readonly categoriesList: string[] = [];
  public readonly cuisinesList: string[] = [];
  public readonly priceSteps: number = 1000;
  public readonly ratingSteps: number = 500;
  public readonly minPrice: number = 0;
  public readonly maxPrice: number = 0;
  public readonly minRating: number = 0;
  public readonly maxRating: number = 0;
  public readonly FilterAttr = FilterAttr;

  public readonly settings = {
    idField: 'filterID',
    textField: 'filterValue',
    allowSearchFilter: true,
    singleSelection: false,
    enableCheckAll: true,
    itemsShowLimit: 2,
    selectAllText: 'Zaznacz wszystkie',
    unSelectAllText: 'Odznacz wszystkie',
  };

  // Options that are used as placeholder values when no other values wre specified
  placeholderOptions: Options = {
    floor: 0,
    ceil: 0
  };

  public selectedCategories: string[] = [];
  public selectedCuisines: string[] = [];

  priceOptions: Options = { ...this.placeholderOptions };
  ratingOptions: Options = { ...this.placeholderOptions };

  public availableFilters!: DishFilters;
  private readonly subscriptions: Subscription[] = [];

  constructor(private filterService: FilterService) {
    this.subscriptions.push(
      this.filterService.availableFiltersSubject.subscribe((availableFilters: DishFilters) => {

      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

