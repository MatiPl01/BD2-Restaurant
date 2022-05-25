import { Injectable } from '@angular/core';
import { HttpService } from "@core/services/http.service";
import { BehaviorSubject, map, Observable, retry } from "rxjs";
import { Review } from "../interfaces/review.interface";
import { ApiPathEnum } from '@shared/enums/api-path.enum';
import { ActivatedRoute } from '@angular/router';
import ReviewModel from '@dishes/models/review.model';
import { ReviewData } from '@dishes/types/review-data.type';

@Injectable()
export class ReviewService {
  private readonly dishId: string;
  private readonly dishReviews$ = new BehaviorSubject<Review[]>([]);
  private readonly dishesToReviewIds$ = new BehaviorSubject<{ dish: string, order: string }[]>([]);
  private readonly loading$ = new BehaviorSubject<boolean>(false);

  constructor(private httpService: HttpService,
              private route: ActivatedRoute) {
    this.dishId = this.route.snapshot.params['id'];
    this.fetchDishesToReviewIds();
    this.fetchReviews();
  }

  get dishReviews(): Review[] {
    return this.dishReviews$.getValue();
  }

  get dishReviewsSubject(): BehaviorSubject<Review[]> {
    return this.dishReviews$;
  }

  get dishesToReviewIds(): { dish: string, order: string }[] {
    return this.dishesToReviewIds$.getValue();
  }

  get dishesToReviewIdsSubject(): BehaviorSubject<{ dish: string, order: string }[]> {
    return this.dishesToReviewIds$;
  }

  get loadingSubject(): BehaviorSubject<boolean> {
    return this.loading$;
  }

  public postReview(data: ReviewData): Observable<ReviewData> {
    return this.httpService.post<ReviewData>(`${ApiPathEnum.REVIEWS}`, data);
  }

  private fetchReviews(): void {
    this.loading$.next(true);

    this.httpService
      .get<Review[]>(`${ApiPathEnum.DISHES}/${this.dishId}/reviews`)
      .pipe(map(reviews => reviews.map(review => new ReviewModel(review))))
      .subscribe(reviews => {
        this.dishReviews$.next(reviews);
        this.loading$.next(false);
      });
  }

  private fetchDishesToReviewIds(): void {
    this.httpService
      .get<{ dish: string, order: string }[]>(`${ApiPathEnum.DISHES}/to-review`)
      .subscribe(dishesIds => this.dishesToReviewIds$.next(dishesIds));
  }
}
