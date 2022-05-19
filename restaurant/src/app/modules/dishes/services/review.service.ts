import { Injectable } from '@angular/core';
import { HttpService } from "@core/services/http.service";
import { Observable } from "rxjs";
import { ReviewData } from "../interfaces/review.interface";
import { ApiPathEnum } from "@shared/enums/api-path.enum";
import * as queryString from "query-string";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private httpService: HttpService) {}

  getReviews(filter: any/*TODO*/):Observable<ReviewData[]>{
    // TEST TO WORK
    return this.httpService.get<ReviewData[]>(ApiPathEnum.REVIEWS+'?'+queryString.stringify(filter,{arrayFormat: 'comma'}));
  }

  getSpecificReview(id:string,fields:string[]):Observable<ReviewData>{
    // TEST TO WORK
    return this.httpService.get<ReviewData>(ApiPathEnum.REVIEWS+'/'+id+'?'+queryString.stringify({fields:fields},{arrayFormat: 'comma'}));
  }

  createReview(reviewData:ReviewData):Observable<ReviewData>{
    return this.httpService.post<ReviewData>(ApiPathEnum.REVIEWS,reviewData);
  }

  editReview(id:string,reviewData:ReviewData):Observable<ReviewData>{
    return this.httpService.patch<ReviewData>(ApiPathEnum.REVIEWS+'/'+id,reviewData);
  }

  deleteReview(id:string):void{
    this.httpService.delete(ApiPathEnum.REVIEWS+'/'+id);
  }
}
