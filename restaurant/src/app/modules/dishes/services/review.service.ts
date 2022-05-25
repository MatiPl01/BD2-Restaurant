import { Injectable } from '@angular/core';
import { HttpService } from "@core/services/http.service";
import { BehaviorSubject, map } from "rxjs";
import { Review } from "../interfaces/review.interface";
import { ApiPathEnum } from '@shared/enums/api-path.enum';
import { ActivatedRoute } from '@angular/router';
import ReviewModel from '@dishes/models/review.model';

@Injectable()
export class ReviewService {
  private readonly dishId: string;
  private readonly reviews$ = new BehaviorSubject<Review[]>([]);
  private readonly loading$ = new BehaviorSubject<boolean>(false);
  
  constructor(private httpService: HttpService,
              private route: ActivatedRoute) {
    this.dishId = this.route.snapshot.params['id'];
    this.fetchReviews();
  }

  get reviews(): Review[] {
    return this.reviews$.getValue();
  }

  get reviewsSubject(): BehaviorSubject<Review[]> {
    return this.reviews$;
  }

  get loadingSubject(): BehaviorSubject<boolean> {
    return this.loading$;
  }

  private fetchReviews(): void {
    this.loading$.next(true);

    this.httpService
      .get<Review[]>(`${ApiPathEnum.DISHES}/${this.dishId}/reviews`)
      .pipe(map(reviews => reviews.map(review => new ReviewModel(review))))
      .subscribe(reviews => {
        this.reviews$.next(reviews);
        this.loading$.next(false);
      });
  }
}
