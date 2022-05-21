import { Injectable, EventEmitter, OnDestroy } from "@angular/core";
import { CurrencyService } from "@core/services/currency.service";
import { HttpService } from "@core/services/http.service";
import { FilterAttr } from "@dishes/enums/filter-attr.enum";
import { DishCard } from "@dishes/interfaces/dish-card.interface";
import { DishFilters } from "@dishes/interfaces/dish-filters.interface";
import { DishFiltersResponse } from "@dishes/types/dish-filters-response.type";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { PaginationService } from "@shared/services/pagination.service";
import { BehaviorSubject, map, Observable, Subscription, timer } from "rxjs";
import { DishService } from "./dish.service"
import setUtils from "@shared/utils/set-utils";
import * as queryString from "query-string";


class FiltersObject implements DishFilters {
  public category = new Set<string>();
  public cuisine = new Set<string>();

  public unitPrice = {
    min: 0,
    max: Infinity
  };

  public ratingsAverage = {
    min: 0,
    max: Infinity
  };

  constructor(data?: DishFiltersResponse | DishFilters) {
    if (!data) return;
    this.category = new Set(data.category);
    this.cuisine = new Set(data.cuisine);
    this.unitPrice = { ...data.unitPrice };
    this.ratingsAverage = { ...this.ratingsAverage };
  }

  clone(): FiltersObject {
    return new FiltersObject(this);
  }
}


@Injectable()
export class FilterService implements OnDestroy {
  private static readonly REFRESH_INTERVAL = 10000; // 10s
  public filtersChangedEvent = new EventEmitter<FiltersObject>();

  // Selected filters will be used to update filters without notifying changes
  // (the behavior subject will be updated, only after the notifyChanges attribute is set to true)
  private selectedFilters = new FiltersObject();
  private appliedFilters$ = new BehaviorSubject<FiltersObject>(new FiltersObject());
  private cachedAvailableFilters$ = new BehaviorSubject<FiltersObject>(new FiltersObject());
  private timer$!: Observable<number>; 

  private filtersFunctions: any = {
    category: (dish: DishCard) => {
      return !this.appliedFilters.category.size || this.appliedFilters.category.has(dish.category);
    },
    cuisine: (dish: DishCard) => {
      return !this.appliedFilters.cuisine.size || this.appliedFilters.cuisine.has(dish.cuisine);
    },
    unitPrice: (dish: DishCard) => {
      const min = this.appliedFilters.unitPrice.min;
      const max = this.appliedFilters.unitPrice.max;
      return min <= dish.unitPrice && dish.unitPrice <= max;
    },
    ratingsAverage: (dish: DishCard) => {
      const min = this.appliedFilters.ratingsAverage.min;
      const max = this.appliedFilters.ratingsAverage.max;
      return min <= dish.ratingsAverage && dish.ratingsAverage <= max;
    }
  }

  private readonly subscriptions: Subscription[] = [];

  constructor(private httpService: HttpService,
              private currencyService: CurrencyService,
              /*private paginationService: PaginationService,
              private dishService: DishService*/) {
    this.setupRefreshTimer();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  get availableFiltersSubject(): BehaviorSubject<DishFilters> {
    return this.cachedAvailableFilters$;
  }

  get availableFilters(): DishFilters {
    return this.cachedAvailableFilters$.getValue();
  }

  get appliedFiltersSubject(): BehaviorSubject<DishFilters> {
    return this.appliedFilters$;
  }

  get appliedFilters(): DishFilters {
    return this.appliedFilters$.getValue();
  }

  public addFilter(filterAttr: FilterAttr, filterValue: string, notifyChanges: boolean = true): void {
    (this.selectedFilters[filterAttr] as Set<string>).add(filterValue);
    if (notifyChanges) this.appliedFilters$.next(this.selectedFilters.clone());
  }

  public setAllFilters(filterAttr: FilterAttr, filterValues: string[], notifyChanges: boolean = true): void {
    (this.selectedFilters[filterAttr] as Set<string>) = new Set(filterValues);
    if (notifyChanges) this.appliedFilters$.next(this.selectedFilters.clone());
  }

  public removeFilter(filterAttr: FilterAttr, filterValue: string, notifyChanges: boolean = true): void {
    (this.selectedFilters[filterAttr] as Set<string>).delete(filterValue);
    if (notifyChanges) this.appliedFilters$.next(this.selectedFilters.clone());
  }

  public removeAllFilters(filterAttr: FilterAttr, notifyChanges: boolean = true): void {
    (this.selectedFilters[filterAttr] as Set<string>).clear();
    if (notifyChanges) this.appliedFilters$.next(this.selectedFilters.clone());
  }

  public setRangeFilter(filterAttr: FilterAttr, minValue: number, maxValue: number, notifyChanges: boolean = true): void {
    (this.appliedFilters[filterAttr] as { min: number, max: number }) = {
      min: minValue,
      max: maxValue
    };
    if (notifyChanges) this.appliedFilters$.next(this.selectedFilters.clone());
  }

  public getFiltersFunction(filterAttr: string): (dish: DishCard) => boolean {
    return this.filtersFunctions[filterAttr];
  }

  public resetFilters(): void {
    this.appliedFilters$.next(new FiltersObject());
  }

  private setupRefreshTimer(): void {
    this.timer$ = timer(0, FilterService.REFRESH_INTERVAL);

    this.subscriptions.push(
      this.timer$.subscribe(_ => {
        this.fetchAvailableFilters().subscribe(filtersObj => {
          // Check if filters have changes since the last update
          if (!this.haveFiltersChanged(filtersObj)) return;
          this.cachedAvailableFilters$.next(filtersObj);
        })
      })
    )
  }

  private fetchAvailableFilters(): Observable<DishFilters> {
    const url = queryString.stringifyUrl({
      url: `${ApiPathEnum.DISHES}/filters`,
      query: {
        fields: Object.values(FilterAttr),
        currency: this.currencyService.currency.code
      }
    }, {
      arrayFormat: 'comma'
    })

    return this.httpService
      .get<DishFilters>(url)
      .pipe(map((data: DishFilters) => new FiltersObject(data)));
  }

  private haveFiltersChanged(newAvailableFilters: DishFilters): boolean {
    const currentAvailableFilters = this.availableFilters;
    return setUtils.areDifferent(currentAvailableFilters.category, newAvailableFilters.category)
        || setUtils.areDifferent(currentAvailableFilters.cuisine, newAvailableFilters.cuisine)
        || currentAvailableFilters.ratingsAverage.min !== newAvailableFilters.ratingsAverage.min
        || currentAvailableFilters.ratingsAverage.max !== newAvailableFilters.ratingsAverage.max
        || currentAvailableFilters.unitPrice.min !== newAvailableFilters.unitPrice.min
        || currentAvailableFilters.unitPrice.max !== newAvailableFilters.unitPrice.max;
  }
}
