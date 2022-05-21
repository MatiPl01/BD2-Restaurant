import { Injectable } from '@angular/core';
import { HttpService } from "@core/services/http.service";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import Dish from '@dishes/models/dish.model';
import { DishData } from "@dishes/interfaces/dish.interface";
import {PaginationData} from "@shared/interfaces/pagination.interface";
import {DishFilterData} from "@dishes/interfaces/dish-filter.interface";
import * as queryString from "query-string";

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private _dishes = new BehaviorSubject<Dish[]>([]);
  private dishesCount: number = 0;
  private pagesCount: number = 0;

  // TODO change to actual
  private currency:string='PLN'
  private filters?:DishFilterData=undefined
  private pagination:PaginationData={page:1,limit:10}

  constructor(private httpService: HttpService) {}

  get dishes(): Observable<Dish[]> {
    if (!this._dishes.getValue().length) {
      return this.requestDishes();
    }
    return this._dishes;
  }

  public getPagesCount():number {
    return this.pagesCount
  }

  public getDishesCount():number {
    return this.dishesCount
  }

  public forceReload(): void {
    this._dishes.next([]);
  }

  private requestDishes(): Observable<Array<Dish>> {
    // TODO - add fields limiting and filtering to the query
    let query = `?currency=${this.currency}`
    query = this.filters ? `${query}&${queryString.stringify(this.filters,{arrayFormat: 'comma',encode: false})}` : query;
    query = `${query}&${queryString.stringify(this.pagination,{arrayFormat: 'comma'})}`
    return this.httpService.get<Partial<Dish>[]>(ApiPathEnum.DISHES+query).pipe(
      tap(res => {
        // TODO - remove ignores, add response data service
        // @ts-ignore
        this.dishesCount = res.filteredCount;
        // @ts-ignore
        this.pagesCount = res.pagesCount;
        // @ts-ignore
        this._dishes.next(res.dishes);
      }),
      map(res => {
        // @ts-ignore
        return res.dishes;
      })
    );
  }
  public updateFilters(filters?:DishFilterData){
    if(filters)this.filters=filters
    else this.filters=undefined
  }

  public updatePagination(pagination:PaginationData){
    this.pagination=pagination
  }

  // createDish(dishData: DishData): Observable<DishData> {
  //   return this.httpService.post<DishData>(ApiPathEnum.DISHES, dishData);
  // }

  // updateDish(id: string, updatedFields: Partial<DishData>): Observable<DishData> {
  //   return this.httpService.patch<DishData>(`${ApiPathEnum.DISHES}/${id}`, updatedFields);
  // }

  // TODO - improve
  fetchDish(id: string, currency?: string, fields?: any): Observable<Dish> {
    const query = currency ? `?currency=${currency}` : '';
    return this.httpService
      .get<Partial<DishData>>(`${ApiPathEnum.DISHES}/${id}${query}`)
      .pipe(map((data: Partial<DishData>) => new Dish(data)));
  }

  // fetchDishes(page: number, limit: number, currency?: string): Observable<DishData[]> {
  //   return this.httpService.get<DishData[]>(ApiPathEnum.DISHES+'?page='+page+'&limit='+limit+'+&currency='+currency);
  // }

  // deleteDish(id: string): void {
  //   this.httpService.delete<void>(`${ApiPathEnum.DISHES}/${id}`);
  // }
}
