// import { Injectable } from '@angular/core';
// import {HttpService} from "@core/services/http.service";
// import { OrderData } from 'app/modules/orders/interfaces/order.interface';
// import { Observable } from 'rxjs';
// import {ApiPathEnum} from "@shared/enums/api-path.enum";
// import { OrderFilterData } from '../interfaces/orderFilter.interface';
// import * as queryString from "query-string";

// @Injectable()
// export class OrdersService {

//   constructor(private httpService: HttpService) {}

//   createOrder(order:Partial<OrderData>):Observable<OrderData> {
//     return this.httpService.post<OrderData>(ApiPathEnum.ORDERS,order)
//   }

//   getCurrentUserOrders():Observable<OrderData[]> {
//     return this.httpService.get<OrderData[]>(ApiPathEnum.ORDERS)
//   }

//   getCurrentUserOrdersWithFilters(filter:OrderFilterData):Observable<OrderData[]> {
//     return this.httpService.get<OrderData[]>(ApiPathEnum.ORDERS+'?'+queryString.stringify(filter,{arrayFormat: 'comma'}));
//   }
// }
