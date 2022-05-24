import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'
import { FilterService } from '@dishes/services/filter.service';
import { FilterAttr } from '@dishes/enums/filter-attr.enum';
import { DishFilters } from '@dishes/interfaces/dish-filters.interface';
import { SingleSelectEvent } from '@shared/types/single-select-event.type';
import { RangeChangeEvent } from '@shared/types/range-change-event.type';
import { MultipleSelectEvent } from '@shared/types/multiple-select-event.type';
import setUtils from '@shared/utils/set-utils';
import { CurrencyService } from '@core/services/currency.service';
import { PaginationService } from '@shared/services/pagination.service';


@Component({
  selector: 'dishes-dishes-filters',
  templateUrl: './dishes-filters.component.html'
})
export class DishesFiltersComponent implements OnDestroy {
  // Initial filters settings
  public availableCategories: string[] = [];
  public availableCuisines: string[] = [];
  public readonly priceSteps: number = 1000;
  public readonly ratingSteps: number = 500;
  public readonly FilterAttr = FilterAttr;

  public readonly settings = {
    idField: 'filterId',
    textField: 'filterValue',
    allowSearchFilter: true,
    singleSelection: false,
    enableCheckAll: true,
    itemsShowLimit: 2,
    selectAllText: 'Zaznacz wszystkie',
    unSelectAllText: 'Odznacz wszystkie',
  };

  public priceBounds = {
    min: 0,
    max: 0
  }

  public ratingsBounds = {
    min: 0,
    max: 0
  }

  // Applied filters settings
  public selectedCategories: string[] = [];
  public selectedCuisines: string[] = [];

  public currentPrice = {
    min: 0,
    max: 0
  }

  public currentRating = {
    min: 0,
    max: 0
  }

  public itemsPerPage: number = 0;
  public possibleItemsPerPage: number[] = [];

  private readonly subscriptions: Subscription[] = [];
  private updatedAvailableFilters = false;

  constructor(private filterService: FilterService,
              private currencyService: CurrencyService,
              private paginationService: PaginationService) {
    this.subscriptions.push(
      this.filterService.availableFiltersSubject.subscribe(availableFilters => {
        this.updateAvailableFilters(availableFilters);
      }),
      this.paginationService.itemsPerPageSubject.subscribe(itemsPerPage => {
        this.itemsPerPage = itemsPerPage;
      }),
      this.paginationService.possibleItemsPerPageSubject.subscribe(possibleItemsPerPage => {
        this.possibleItemsPerPage = possibleItemsPerPage;
      })
    );

    // Restore filters that are applied
    this.updateAppliedFilters();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public createPriceLabel = (price: number): string => {
    const currency = this.currencyService.currency;
    return this.currencyService.displaySymbolOnTheLeft 
      ? `${currency.symbol}${price}` : `${price}${currency.symbol}`;
  }

  public selectItem({ filterAttr, item }: SingleSelectEvent): void {
    this.filterService.addFilter(filterAttr, item as string); 
  }

  public deSelectItem({ filterAttr, item }: SingleSelectEvent): void {
    this.filterService.removeFilter(filterAttr, item as string);
  }

  public selectItems({ filterAttr, items }: MultipleSelectEvent): void {
    this.filterService.setAllFilters(filterAttr, items as string[]);
  }

  public deSelectAllItems({ filterAttr, items: _ }: MultipleSelectEvent): void {
    this.filterService.removeAllFilters(filterAttr);
  }

  public updateRange({ filterAttr, min, max }: RangeChangeEvent): void {
    console.log(min, max)
    this.filterService.setRangeFilter(filterAttr, min, max);
  }

  public resetFilters(): void {
    this.filterService.resetFilters();
    this.updateAvailableFilters(this.filterService.availableFilters);

    // Create new bound object to force reload slider components
    this.priceBounds = this.currentPrice = { ...this.priceBounds };
    this.ratingsBounds = this.currentRating = { ...this.ratingsBounds };
  }

  public notifyItemsPerPageChange(itemsPerPage: number): void {
    this.paginationService.updateItemsPerPage(itemsPerPage);
  }

  private updateAvailableFilters(filtersObj: DishFilters): void {
    this.availableCategories = setUtils.convertToSortedArray(filtersObj.category);
    this.availableCuisines = setUtils.convertToSortedArray(filtersObj.cuisine);
    
    this.priceBounds = filtersObj.unitPrice;
    this.ratingsBounds = filtersObj.ratingsAverage;

    if (!this.updatedAvailableFilters) {
      this.updatedAvailableFilters = true;
      this.updateAppliedFilters();
    }
  }

  private updateAppliedFilters(): void {
    const appliedFilters = this.filterService.appliedFilters;
    this.selectedCategories = setUtils.convertToSortedArray(appliedFilters.category);
    this.selectedCuisines = setUtils.convertToSortedArray(appliedFilters.cuisine);
    this.currentPrice = { ...appliedFilters.unitPrice };
    this.currentRating = { ...appliedFilters.ratingsAverage };
  }
}
