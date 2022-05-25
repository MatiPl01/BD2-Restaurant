import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CurrencyService } from "@core/services/currency.service";
import { HttpService } from "@core/services/http.service";
import { Dish } from "@dishes/interfaces/dish.interface";
import DishModel from "@dishes/models/dish.model";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import { BehaviorSubject, map, Subscription } from "rxjs";
import * as queryString from 'query-string';

@Injectable()
export class DishPageService {
  private readonly dishId: string;
  private readonly dish$ = new BehaviorSubject<Dish | null>(null);
  private readonly loading$ = new BehaviorSubject<boolean>(false);

  private readonly subscriptions: Subscription[] = [];

  constructor(private httpService: HttpService,
              private currencyService: CurrencyService,
              private route: ActivatedRoute) {
    this.dishId = this.route.snapshot.params['id'];

    this.subscriptions.push(
      this.currencyService.currencySubject.subscribe(currency => {
        if (currency) this.fetchDish(this.dishId, currency.code);
      })
    )
  }

  get dish(): Dish | null {
    return this.dish$.getValue();
  }

  get dishSubject(): BehaviorSubject<Dish | null> {
    return this.dish$;
  }

  get loadingSubject(): BehaviorSubject<boolean> {
    return this.loading$;
  }

  private fetchDish(id: string, currencyCode: string): void {
    this.loading$.next(true);

    const url = queryString.stringifyUrl({
      url: `${ApiPathEnum.DISHES}/${id}`,
      query: {
        currency: currencyCode
      }
    })

    this.httpService
      .get<Dish>(url)
      .pipe(map((data: Dish) => new DishModel(data)))
      .subscribe(dish => {
        this.dish$.next(dish)
        this.loading$.next(false);
      });
  }
}
