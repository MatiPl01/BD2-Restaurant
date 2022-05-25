import { Component, Input, OnInit } from '@angular/core';
import { Review } from '@dishes/interfaces/review.interface';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html'
})
export class ReviewComponent implements OnInit {
  private static readonly DATE_OPTIONS = {
    weekday: 'long',
    year: 'numeric',
    month: 'long', 
    day: 'numeric' 
  };

  @Input() review!: Review
  public dateString: string = '';

  ngOnInit(): void {
    this.dateString = this.formatDateString();
  }

  private formatDateString(): string {
    return new Date(this.review.createdAt)
      // @ts-ignore  - this is a TypeScript bug
      .toLocaleDateString('PL-pl', ReviewComponent.DATE_OPTIONS);
  }
}
