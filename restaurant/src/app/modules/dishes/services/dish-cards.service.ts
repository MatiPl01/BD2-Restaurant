import { Injectable, OnDestroy } from '@angular/core';
import { HttpService } from "@core/services/http.service";
import { BehaviorSubject, skip, Subscription } from "rxjs";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { CurrencyService } from '@core/services/currency.service';
import * as queryString from 'query-string';
import { FilterService } from './filter.service';
import { DishCard } from '@dishes/interfaces/dish-card.interface';
import { PaginationService } from '@shared/services/pagination.service';
import DishCardModel from '@dishes/models/dish-card-model';
import { DishCardsResponse } from '@dishes/types/dish-cards-response.type';
import { NavigationService } from '@core/services/navigation.service';


@Injectable()
export class DishCardsService implements OnDestroy {
  private readonly dishes$ = new BehaviorSubject<DishCard[]>([]);
  private readonly loading$ = new BehaviorSubject<boolean>(false);

  private readonly subscriptions: Subscription[] = [];
  public currentPage = 0;

  constructor(private httpService: HttpService,
              private currencyService: CurrencyService,
              private filterService: FilterService,
              private paginationService: PaginationService,
              private navigationService: NavigationService) {
    this.subscriptions.push(
      this.filterService.appliedFiltersSubject.subscribe(_ => {
        this.currentPage = 1;
        this.fetchDishes();
      }),
      this.paginationService.itemsPerPageSubject
        .pipe(skip(1))  // Skip the initial value of the behavior Subject
        .subscribe(_ => {
          this.fetchDishes();
        }),
      this.paginationService.currentPageSubject
        .pipe(skip(1))  // Skip the initial value of the behavior Subject
        .subscribe(_ => {
          this.currentPage = this.paginationService.currentPage;
          this.fetchDishes();
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  get dishesSubject(): BehaviorSubject<DishCard[]> {
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
    if (!this.currencyService.currency) {
      throw new Error('Cannot get the current currency');
    }

    this.loading$.next(true);
    const query: { [key: string]: string | number } = {
      currency: this.currencyService.currency.code,
      ...(this.filterService.appliedFilters.queryObj),
      page: this.currentPage,
      limit: this.paginationService.itemsPerPage,
      fields: 'name,category,cuisine,type,stock,currency,unitPrice,ratingsAverage,ratingsCount,coverImage' // TODO - extract this to variable or move somewhere else
    }

    // TODO - make it work also when user goes back to the /dishes endpoint
    const url = queryString.stringifyUrl({
      url: `${ApiPathEnum.DISHES}`,
      query,
    })

    // TODO - fetch dishes when url changes (e.q. user enters the specific url)
    const urlQuery = { ...query };
    // This will be set automatically for the /dishes endpoint
    delete urlQuery['fields'];
    this.navigationService.setQueryOptions(urlQuery);

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
}
