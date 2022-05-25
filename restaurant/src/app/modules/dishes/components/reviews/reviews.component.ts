import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Review } from '@dishes/interfaces/review.interface';
import { ReviewService } from '@dishes/services/review.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dishes-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnDestroy {
  @Input() dishId!: string;

  public isLoading = false;
  public reviews: Review[] = [];
  public canUserWriteReview = true; // TODO - check if user is allowed to write a review

  private readonly subscriptions: Subscription[] = [];

  constructor(private reviewService: ReviewService) {
    this.subscriptions.push(
      this.reviewService.reviewsSubject.subscribe(reviews => {
        this.reviews = reviews;
      }),
      this.reviewService.loadingSubject.subscribe(isLoading => {
        this.isLoading = isLoading;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
