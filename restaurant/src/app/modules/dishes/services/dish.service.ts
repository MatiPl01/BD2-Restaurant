import { Injectable, OnDestroy } from '@angular/core';
import { HttpService } from "@core/services/http.service";
import { BehaviorSubject, map, Observable, Subscription, tap } from "rxjs";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { Dish } from "@dishes/interfaces/dish.interface";
import DishModel from '@dishes/models/dish.model';
import { CurrencyService } from '@core/services/currency.service';
import * as queryString from 'query-string';
import { FilterService } from './filter.service';
import { DishCard } from '@dishes/interfaces/dish-card.interface';
import { PaginationService } from '@shared/services/pagination.service';
import DishCardModel from '@dishes/models/dish-card-model';
import { DishCardsResponse } from '@dishes/types/dish-cards-response.type';


@Injectable()
export class DishService implements OnDestroy {
  private readonly dishes$ = new BehaviorSubject<DishCard[]>([]);
  private _allDishesCount: number = 0;
  private _filteredDishesCount: number = 0;
  private _pagesCount: number = 0;

  private readonly subscriptions: Subscription[] = [];

  constructor(private httpService: HttpService,
              private currencyService: CurrencyService,
              private filterService: FilterService,
              private paginationService: PaginationService) {
    this.subscriptions.push(
      this.filterService.appliedFiltersSubject.subscribe(_ => {
        this.requestDishes().subscribe(dishes => this.dishes$.next(dishes));
      })
    )            
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  get dishesSubject(): Observable<DishCard[]> {
    return this.dishes$;
  }

  get dishes(): DishCard[] {
    return this.dishes$.getValue();
  }

  get pagesCount(): number {
    return this._pagesCount;
  }

  get filteredDishesCount(): number {
    return this._filteredDishesCount;
  }

  get allDishesCount(): number {
    return this._allDishesCount;
  }

  // TODO - maybe rename to requestDishesCards or something similar to indicate
  // that returned dishes are in fact partial documents
  private requestDishes(): Observable<DishCard[]> {
    const url = queryString.stringifyUrl({
      url: `${ApiPathEnum.DISHES}`,
      query: {
        currency: this.currencyService.currency.code,
        ...(this.filterService.areFiltersApplied ? this.filterService.appliedFilters.queryObj : {}),
        page: 1, // TODO - reset page in the pagination service
        limit: this.paginationService.itemsPerPage,
        fields: 'name,category,cuisine,type,stock,currency,unitPrice,ratingsAverage,ratingsCount,coverImage' // TODO - extract this to variable or move somewhere else
      }
    })

    return this.httpService
      .get<DishCardsResponse>(url)
      .pipe(map(response => {
        return response.dishes.map(dish => new DishCardModel(dish));
      }));
  }

  // TODO - improve this fetch below (add proper interface, use query-string library)
  public fetchDish(id: string, currency?: string, fields?: any): Observable<Dish> {
    const query = currency ? `?currency=${currency}` : '';

    return this.httpService
      .get<Dish>(`${ApiPathEnum.DISHES}/${id}${query}`)
      .pipe(map((data: Dish) => new DishModel(data)));
  }
}
