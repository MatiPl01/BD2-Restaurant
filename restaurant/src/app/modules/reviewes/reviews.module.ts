import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReviewFormComponent} from "./views/review-form/review-form.component";
import {ReviewComponent} from "./views/review/review.component";
import {ReviewsComponent} from "./views/reviews/reviews.component";


@NgModule({
  declarations: [
    ReviewFormComponent,
    ReviewComponent,
    ReviewsComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class ReviewsModule { }
