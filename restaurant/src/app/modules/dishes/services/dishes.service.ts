import {Injectable} from '@angular/core';
import {HttpService} from "@core/services/http.service";
import {Observable} from "rxjs";
import {ApiPathEnum} from "@shared/enums/api-path.enum";
import {DishData} from "@dishes/interfaces/dish.interface";
import {CurrencyEnum} from "@shared/enums/currency.enum";
import {DishFilterData} from "@dishes/interfaces/dish-filter.interface";
import * as queryString from "query-string";

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  constructor(private httpService: HttpService) {}

  createDish(updatedFields: Partial<DishData>): Observable<DishData> {
    return this.httpService.post<DishData>(ApiPathEnum.DISHES, updatedFields);
  }

  updateDish(updatedFields: Partial<DishData>,id:string): Observable<DishData> {
    return this.httpService.patch<DishData>(ApiPathEnum.DISHES+'/'+id, updatedFields);
  }

  getDish(id:string,currency:CurrencyEnum): Observable<DishData> {
    return this.httpService.get<DishData>(ApiPathEnum.DISHES+'/'+id+'?currency='+currency);
  }

  getDishes(page:number,limit:number,currency:CurrencyEnum): Observable<DishData[]> {
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

  // Code Duplication with Review Service
  // getDishReviews(filter:ReviewFilterData):Observable<ReviewData[]>{
  // }

  deleteDish(id:number):void{
    this.httpService.delete<void>(ApiPathEnum.DISHES+'/'+id)
  }


}

