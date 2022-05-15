import {Injectable} from '@angular/core';
import {HttpService} from "@core/services/http.service";
import {Observable} from "rxjs";
import {ApiPathEnum} from "@shared/enums/api-path.enum";
import {DishData} from "@dishes/interfaces/dish.interface";
import {DishFilterData} from "@dishes/interfaces/dish-filter.interface";
import * as queryString from "query-string";
import {ReviewFilterData} from "../../reviewes/interfaces/review-filter.interface";
import { ReviewData } from 'app/modules/reviewes/interfaces/review.interface';

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  constructor(private httpService: HttpService) {}

  createDish(dishData: DishData): Observable<DishData> {
    return this.httpService.post<DishData>(ApiPathEnum.DISHES, dishData);
  }

  updateDish(id: string, updatedFields: Partial<DishData>): Observable<DishData> {
    return this.httpService.patch<DishData>(`${ApiPathEnum.DISHES}/${id}`, updatedFields);
  }

  getDish(id:string, currency?: string): Observable<DishData> {
    const query = currency ? `?currency=${currency}` : '';
    return this.httpService.get<DishData>(`${ApiPathEnum.DISHES}/${id}${query}`);
  }

  getDishes(page: number, limit: number, currency?: string): Observable<DishData[]> {
    return this.httpService.get<DishData[]>(ApiPathEnum.DISHES+'?page='+page+'&limit='+limit+'+&currency='+currency);
  }

  getFiltredDishes(filter:DishFilterData):Observable<DishData[]> {
    // TEST TO WORK
    return this.httpService.get<DishData[]>(ApiPathEnum.DISHES+'?'+queryString.stringify(filter,{arrayFormat: 'comma'}));
  }

  getSpecificFildsOfOneDish(fields:string[],id:number):Observable<DishData>{
    // TEST TO WORK
    return this.httpService.get<DishData>(ApiPathEnum.DISHES+'/'+id+'?'+queryString.stringify({fields:fields},{arrayFormat: 'comma'}));
  }

  getSpecificFildsOfAllDishes(fields:string[]):Observable<DishData[]>{
    // TEST TO WORK
    return this.httpService.get<DishData[]>(ApiPathEnum.DISHES+queryString.stringify({fields:fields},{arrayFormat: 'comma'}));
  }

  getDishReviews(filter:ReviewFilterData):Observable<ReviewData[]>{
    // TEST TO WORK
    return this.httpService.get<ReviewData[]>(ApiPathEnum.DISHES+'?'+queryString.stringify(filter,{arrayFormat: 'comma'}));
  }

  deleteDish(id:number):void{
    this.httpService.delete<void>(ApiPathEnum.DISHES+'/'+id)
  }
}
