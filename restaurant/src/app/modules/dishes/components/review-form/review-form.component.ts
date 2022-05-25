import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { AuthService } from '@auth/services/auth.service'
import { ReviewService } from '@dishes/services/review.service'
import { ReviewData } from '@dishes/types/review-data.type'


@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html'
})
export class ReviewFormComponent {
  ratingValue: number = 5
  dishID: string

  currentDate: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private reviewService: ReviewService) {
    this.dishID = this.activatedRoute.parent?.snapshot.params['id']
    this.currentDate = this.getCurrentDate();
  }

  onSubmit(form: NgForm): void {
    const { dish, order } = this.reviewService.dishesToReviewIds.find(toReview => toReview.dish === this.dishID)!;

    const review: ReviewData = {
      dish,
      order, 
      body: form.value.body.split('\n').map((p: string) => p.trim()) as string[],
      rating: this.ratingValue
    }
    this.reviewService.postReview(review).subscribe(() => {
      this.router.navigate(['..'], { relativeTo: this.activatedRoute })
    });
  }

  onReset(): void {
    this.ratingValue = 5
  }

  private getCurrentDate(): string {
    const currDate = new Date()
    const year = currDate.getFullYear()
    const month = (currDate.getMonth() + 1).toFixed().padStart(2, '0')
    const day = (currDate.getDate()).toFixed().padStart(2, '0')
    return `${year}-${month}-${day}`
  }
}
