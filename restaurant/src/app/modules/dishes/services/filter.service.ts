import { Injectable, EventEmitter, OnDestroy } from "@angular/core";
import { CurrencyService } from "@core/services/currency.service";
import { HttpService } from "@core/services/http.service";
import { FilterAttr } from "@dishes/enums/filter-attr.enum";
import { DishFilters } from "@dishes/interfaces/dish-filters.interface";
import { DishFiltersResponse } from "@dishes/types/dish-filters-response.type";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { BehaviorSubject, map, Observable, Subscription, timer } from "rxjs";
import setUtils from "@shared/utils/set-utils";
import * as queryString from "query-string";

// TODO - maybe move this somewhere else
class FiltersObject implements DishFilters {
  public readonly category = new Set<string>();
  public readonly cuisine = new Set<string>();

  public readonly unitPrice = {
    min: 0,
    max: Infinity
  };

  public readonly ratingsAverage = {
    min: 0,
    max: Infinity
  };

  constructor(data?: DishFiltersResponse | DishFilters) {
    if (!data) return;
    this.category = new Set(data.category);
    this.cuisine = new Set(data.cuisine);
    this.unitPrice = { ...data.unitPrice };
    this.ratingsAverage = { ...data.ratingsAverage };
  }

  get queryObj(): { [key: string]: string | number } {
    const obj: { [key: string]: string | number } = {};
    Object.values(FilterAttr).forEach(filterAttr => this.addQuery(filterAttr, obj));
    return obj;
  }

  private addQuery(filterAttr: FilterAttr, obj: { [key: string]: string | number }): void {
    if (this[filterAttr] instanceof Set) {
      const set = this[filterAttr] as Set<string>;
      if (set.size) {
        obj[filterAttr] = [...set].join(',');
      }
    } else {
      const range = this[filterAttr] as { min: number, max: number };
      if (range.min > 0) obj[`${filterAttr}[gte]`] = range.min;
      if (range.max < Infinity) obj[`${filterAttr}[lte]`] = range.max;
    }
  }

  public clone(): FiltersObject {
    return new FiltersObject(this);
  }
}


@Injectable()
export class FilterService implements OnDestroy {
  private static readonly REFRESH_INTERVAL = 10000; // 10s
  public filtersChangedEvent = new EventEmitter<DishFilters>();

  // Selected filters will be used to update filters without notifying changes
  // (the behavior subject will be updated, only after the notifyChanges attribute is set to true)
  private selectedFilters = new FiltersObject();
  private appliedFilters$ = new BehaviorSubject<DishFilters>(new FiltersObject());
  private availableFilters$ = new BehaviorSubject<DishFilters>(new FiltersObject());
  private timer$!: Observable<number>; 

  private timerSubscription!: Subscription;
  private _areFiltersApplied = false;

  constructor(private httpService: HttpService,
              private currencyService: CurrencyService) {
    this.setupRefreshTimer();
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  get availableFiltersSubject(): BehaviorSubject<DishFilters> {
    return this.availableFilters$;
  }

  get availableFilters(): DishFilters {
    return this.availableFilters$.getValue();
  }

  get appliedFiltersSubject(): BehaviorSubject<DishFilters> {
    return this.appliedFilters$;
  }

  get appliedFilters(): DishFilters {
    return this.appliedFilters$.getValue();
  }

  get areFiltersApplied(): boolean {
    return this._areFiltersApplied;
  }

  public addFilter(filterAttr: FilterAttr, filterValue: string): void {
    (this.selectedFilters[filterAttr] as Set<string>).add(filterValue);
  }

  public setAllFilters(filterAttr: FilterAttr, filterValues: string[]): void {
    (this.selectedFilters[filterAttr] as Set<string>) = new Set(filterValues);
  }

  public removeFilter(filterAttr: FilterAttr, filterValue: string): void {
    (this.selectedFilters[filterAttr] as Set<string>).delete(filterValue);
  }

  public removeAllFilters(filterAttr: FilterAttr): void {
    (this.selectedFilters[filterAttr] as Set<string>).clear();
  }

  public setRangeFilter(filterAttr: FilterAttr, minValue: number, maxValue: number): void {
    (this.selectedFilters[filterAttr] as { min: number, max: number }) = {
      min: minValue,
      max: maxValue
    };

    console.log(this.selectedFilters);
  }

  public applyFilters(): void {
    this.appliedFilters$.next(this.selectedFilters.clone());
  }

  public resetFilters(): void {
    this.appliedFilters$.next(new FiltersObject());
    this._areFiltersApplied = false;
  }

  private setupRefreshTimer(): void {
    this.timer$ = timer(0, FilterService.REFRESH_INTERVAL);

    this.timerSubscription = this.timer$.subscribe(_ => {
      this.fetchAvailableFilters();
    })
  }

  private fetchAvailableFilters() {
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
      .pipe(map((data: DishFilters) => new FiltersObject(data)))
      .subscribe({
        next: filtersObj => {
          // Check if filters have changes since the last update
          if (!this.haveFiltersChanged(filtersObj)) return;
          this.availableFilters$.next(filtersObj);
          this._areFiltersApplied = true;
        },
        error: _ => {
          // Unsubscribe on error
          this.timerSubscription.unsubscribe();
        }
      });
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
