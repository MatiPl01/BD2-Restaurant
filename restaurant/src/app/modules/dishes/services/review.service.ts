import { Injectable } from '@angular/core';
import { HttpService } from "@core/services/http.service";
import { Observable } from "rxjs";
import { Review } from "../interfaces/review.interface";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import * as queryString from "query-string";

@Injectable()
export class ReviewService {
  // constructor(private httpService: HttpService) {}

  // getReviews(filter: any/*TODO*/):Observable<Review[]>{
  //   // TEST TO WORK
  //   return this.httpService.get<Review[]>(ApiPathEnum.REVIEWS+'?'+queryString.stringify(filter,{arrayFormat: 'comma'}));
  // }

  // getSpecificReview(id:string,fields:string[]):Observable<Review>{
  //   // TEST TO WORK
  //   return this.httpService.get<Review>(ApiPathEnum.REVIEWS+'/'+id+'?'+queryString.stringify({fields:fields},{arrayFormat: 'comma'}));
  // }

  // createReview(reviewData:Review):Observable<Review>{
  //   return this.httpService.post<Review>(ApiPathEnum.REVIEWS,reviewData);
  // }

  // editReview(id:string,reviewData:Review):Observable<Review>{
  //   return this.httpService.patch<Review>(ApiPathEnum.REVIEWS+'/'+id,reviewData);
  // }

  // deleteReview(id:string):void{
  //   this.httpService.delete(ApiPathEnum.REVIEWS+'/'+id);
  // }
}
