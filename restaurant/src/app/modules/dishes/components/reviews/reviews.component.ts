import { Component, Input, OnDestroy } from '@angular/core';
import { Review } from '@dishes/interfaces/review.interface';
import { ReviewService } from '@dishes/services/review.service';
import { RoleEnum } from '@shared/enums/role.enum';
import { skip, Subscription, take } from 'rxjs';

@Component({
  selector: 'dishes-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnDestroy {
  @Input() dishId!: string;

  public isLoading = false;
  public reviews: Review[] = [];
  public canUserWriteReview = true;
  public RoleEnum = RoleEnum;

  private readonly subscriptions: Subscription[] = [];

  constructor(private reviewService: ReviewService) {
    this.subscriptions.push(
      this.reviewService.dishReviewsSubject.subscribe(reviews => {
        this.reviews = reviews;
      }),
      this.reviewService.loadingSubject.subscribe(isLoading => {
        this.isLoading = isLoading;
      }),
      );
      this.reviewService.dishesToReviewIdsSubject.pipe(skip(1), take(1)).subscribe(toReviewList => {
        this.canUserWriteReview = toReviewList.findIndex(toReview => toReview.dish === this.dishId) != -1;
      })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
