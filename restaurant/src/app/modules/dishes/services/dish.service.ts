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
  private readonly loading$ = new BehaviorSubject<boolean>(false);

  private readonly subscriptions: Subscription[] = [];
  private isItemsPerPageSubjectInitialized = false;
  private isCurrentPageSubjectInitialized = false;
  public currentPage = 0;

  constructor(private httpService: HttpService,
              private currencyService: CurrencyService,
              private filterService: FilterService,
              private paginationService: PaginationService) {
    this.subscriptions.push(
      this.filterService.appliedFiltersSubject.subscribe(_ => {
        this.currentPage = 1;
        this.fetchDishes();
      }),
      this.paginationService.itemsPerPageSubject.subscribe(_ => {
        if (this.isItemsPerPageSubjectInitialized) this.fetchDishes();
        else this.isItemsPerPageSubjectInitialized = true;
      }),
      this.paginationService.currentPageSubject.subscribe(_ => {
        this.currentPage = this.paginationService.currentPage;
        if (this.isCurrentPageSubjectInitialized) this.fetchDishes();
        else this.isCurrentPageSubjectInitialized = true;
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

  get loadingSubject(): BehaviorSubject<boolean> {
    return this.loading$;
  }

  // TODO - maybe rename to requestDishesCards or something similar to indicate
  // that returned dishes are in fact partial documents
  private fetchDishes(): void {
    this.loading$.next(true);
    const url = queryString.stringifyUrl({
      url: `${ApiPathEnum.DISHES}`,
      query: {
        currency: this.currencyService.currency.code,
        ...(this.filterService.appliedFilters.queryObj),
        page: this.currentPage,
        limit: this.paginationService.itemsPerPage,
        fields: 'name,category,cuisine,type,stock,currency,unitPrice,ratingsAverage,ratingsCount,coverImage' // TODO - extract this to variable or move somewhere else
      }
    })

    this.httpService
      .get<DishCardsResponse>(url)
      .subscribe(response => {
        this.paginationService.updatePages(
          response.pagesCount, 
          response.currentPage, 
          response.filteredCount
        );
      
        const dishes = response.dishes.map(dish => new DishCardModel(dish));
        this.dishes$.next(dishes);
        this.loading$.next(false);
      });
  }

  // TODO - improve this fetch below (add proper interface, use query-string library)
  public fetchDish(id: string, currency?: string, fields?: any): Observable<Dish> {
    const query = currency ? `?currency=${currency}` : '';

    return this.httpService
      .get<Dish>(`${ApiPathEnum.DISHES}/${id}${query}`)
      .pipe(map((data: Dish) => new DishModel(data)));
  }
}
